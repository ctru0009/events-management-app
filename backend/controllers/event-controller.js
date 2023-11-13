
/**
 * Event model from the database.
 * @type {object}
 * @const
 */
const Event = require("../models/events");

/**
 * Category model from the database.
 * @type {object}
 * @const
 */
const Category = require("../models/category");

/**
 * CRUD controller to call functions
 * @type {object}
 * @const
 */
const crudCont = require("../controllers/crud-controller");




module.exports = {
    /**
     * Adds new event to the database.
     * The endpoint respond with a JSON object containing the event ID of the newly added event
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {JSON} A JSON object containing the category ID of the newly added category.
     * @throws {Error} If an error occurs during the addition.
     */
    addEventAPI: async function (req, res) {
        try {
            let anEvent = new Event({
                name: req.body.name,
                description: req.body.description,
                startDateTime: new Date(req.body.startDateTime),
                durationInMin: req.body.durationInMin,
                isActive: req.body.isActive,
                image: req.body.image,
                capacity: req.body.capacity,
                ticketsAvailable: req.body.ticketsAvailable,
                categoryId: req.body.categoryId,
            });

            // Update categoryList and eventList
            let categories = anEvent.categoryId.split(",");  // split string into array

            for (let i = 0; i < categories.length; i++) {
                let aCategory = await Category.findOne({ id: categories[i] }); // find category with the same id
                if (aCategory != null){  // if category exist, add to event
                    anEvent.categoryList.push(aCategory); // add category to event's categoryList
                    await anEvent.save();
                    aCategory.eventList.push(anEvent); // add event to category's eventList
                    await aCategory.save();
                }
            }

            await anEvent.save(); 
            crudCont.increaseCreatedCount(); // increase created count
            res.status(200).json({ id: anEvent.id }); // return event id

        } catch (err) {
            console.log(err);
            res.status(400).json({ status: "Fail to create event" });
        }
    },


    /**
     * Lists all events in the database.
     * This endpoint return the list of all events and the details for their categories in a JSON format
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {JSON} A JSON object containing the list of all events and the details for their categories.
     * @throws {Error} If an error occurs during the listing.
     */
    listEventAPI: async function (req, res) {
        let events = await Event.find().populate("categoryList");  
        res.status(200).json(events); 
    },

    
    /**
     * Displays the details of a specific event by passing the event ID as a URL parameter
     * This endpoint return the details of a specific event
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {JSON} A JSON object of the specific event. 
     * @throws {Error} If the event ID was not found .
     */
    displayEventAPI: async function (req, res) {
        try {
            let eventID = req.params.eventID;
            let query = { id: eventID };
            let eventDetail = await Event.findOne(query).populate("categoryList");    // find event by id
            res.status(200).json(eventDetail); 
        }catch (err) {
            console.log(err);
            res.status(400).json({ status: "ID was not found" });
        }
        
    },


    /**
     * Deletes an event from the database.
     * This endpoint deletes an event by its ID and all the categories that are listed in the 'categoryList' field
     * and return a JSON object containing the number of deleted documents
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {JSON} A JSON object containing the number of deleted documents.
     * @throws {Error} If an error occurs during the deletion.
     */
    deleteEventAPI: async function (req, res) {
        try {
            let id = req.body.id;  // get id from request body
            let anEvent = await Event.findOne({ id: id }); // find event by id
            let categories = anEvent.categoryList; // get event's categoryList

            // remove deleted event ID from eventList in all the categories in the categoryList
            for (let i = 0; i < categories.length; i++) {  // loop through categories                
                // find using category _id
                let aCategory = await Category.findOne({_id: categories[i]._id}); 
                // find index of event in category's eventList
                let index = aCategory.eventList.indexOf(anEvent._id); 
                // remove one event from category's eventList
                aCategory.eventList.splice(index, 1); 
                await aCategory.save();
            }

            let result = await Event.deleteOne({ id: id });  // delete event
            crudCont.increaseDeletedCount();  // increase deleted count
            res.status(200).json(result);  // return number of deleted documents

        } catch (err) {
            console.log(err);
            res.status(400).json({ status: "ID was not found" });
        }
    },

    /**
     * Updates an event in the database.
     * This endpoint update event name and capacity by ID:
     * The ID, new name and capacity are sent as a JSON object through the request body
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {JSON} A JSON object containing the number of updated documents.
     * @throws {Error} If an error occurs during the update.
     */
    updateEventAPI: async function (req, res) {
        try {
            let id = req.body.id;  
            let name = req.body.name;  
            let capacity = req.body.capacity;

            let anEvent = await Event.findOne({ id: id });  // find event by id

            // check if name is valid (cannot be empty and must be alphanumeric)
            if (/^[a-zA-Z0-9 ]+$/.test(name) == false){
                return res.status(400).json({ status: "Name must be alphanumeric" });
            } 

            // check if capacity is valid (cannot be less than ticketsAvailable and must below 2000)
            if (capacity < anEvent.ticketsAvailable || capacity > 2000) {
                return res.status(400).json({ status: "Capacity must be more than the tickets available and must be between 10 and 2000 (inclusive)" });
            }

            // find event and update name and capacity
            let updatedEvent = await Event.findOneAndUpdate(  
                { id: id },
                { name: name, capacity: capacity }
            ); 
            await updatedEvent.save();
            crudCont.increaseUpdatedCount();  // increase updated count
            res.status(200).json({ status: "Updated successfully" }); 

        } catch (err) {
            console.log(err);
            res.status(400).json({ status: "ID was not found" });
        }
    },


    /**
     * Gets the number of events in the database.
     * @function
     * @returns {number} The number of events in the database.
     */
    getEventCount: async function () {
        let count = await Event.countDocuments(); // get number of events in collection
        return count;
    },


    /**
     * Adds new event to the database.
     * This endpoint adds a new event to the database and redirect to the event list page
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @throws {Error} If an error occurs during the addition.
     */
    addEvent: async function (req, res) {
        try {
            let anEvent = new Event({
                name: req.body.eventName,
                description: req.body.eventDescription ? req.body.eventDescription : "No description available",
                startDateTime: new Date(req.body.eventStartDateTime),
                durationInMin: req.body.eventDurationInMin,
                isActive: req.body.eventIsActive ? true : false,
                image: req.body.eventImage ? req.body.eventImage : "Event_Detail.png",
                capacity: req.body.eventCapacity ? req.body.eventCapacity : 1000,
                ticketsAvailable: req.body.eventTicketsAvailable ? req.body.eventTicketsAvailable : req.body.eventCapacity,
                categoryId: req.body.eventCategoryId,
            });

            // Update categoryList and eventList
            let categories = anEvent.categoryId.split(",");  // split string into array
            
            for (let i = 0; i < categories.length; i++) {
                let aCategory = await Category.findOne({ id: categories[i] }); // find category with the same id
                if (aCategory != null){  // if category exist, add to event
                    anEvent.categoryList.push(aCategory); // add category to event's categoryList
                    await anEvent.save();
                    aCategory.eventList.push(anEvent); // add event to category's eventList
                    await aCategory.save();
                }
            }

            await anEvent.save();
            crudCont.increaseCreatedCount();  // increase created count
            res.redirect("/qian/list-events");

        } catch (err) {
            res.status(400).send("Fail to create event");
        }
    },

    /**
     * Lists all events in the database.
     * This endpoint lists all events in the database
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     */
    listEvent: async function (req, res) {
        let events = await Event.find();
        res.render("events-list", { eventsList: events });
    },

    /**
     * Lists all events that are sold out in the database.
     * This endpoint lists all events that are sold out in the database
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     */
    listSoldOutEvent: async function (req, res) {
        let soldOutList = await Event.find({ ticketsAvailable: 0 });
        res.render("events-sold-list", { soldEventsList: soldOutList });
    },

    /**
     * Deletes an event from the database.
     * This endpoint deletes an event by its ID and all the categories that are listed in the 'categoryList' field
     * and redirect to the event list page
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @throws {Error} If an error occurs during the deletion. 
     */
    deleteEventByID: async function (req, res) {  
        try{
            let deletedId = req.query.deletedId;  // get deletedId from request body
            let anEvent = await Event.findOne({id: deletedId}); // find event by id
            let categories = anEvent.categoryList; // get event's categoryList

            // remove deleted event ID from eventList in all the categories in the categoryList
            for (let i = 0; i < categories.length; i++) { // loop through categories
                // find using category _id
                let aCategory = await Category.findOne({_id: categories[i]._id}); 
                // find index of event in category's eventList
                let index = aCategory.eventList.indexOf(anEvent._id); 
                // remove one event from category's eventList
                aCategory.eventList.splice(index, 1); 
                await aCategory.save();
            }

            await Event.deleteOne({ id: deletedId });  // delete event
            crudCont.increaseDeletedCount();  // increase deleted count
            res.redirect("/qian/list-events");

        }catch(err){
            res.status(400).send("ID was not found");
        }
    },

    /**
     * Displays the details of a specific category and its events by passing the category ID as a URL parameter
     * and renders the event-category-detail page
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     */
    renderCategoryDetails: async function (req, res) {
        let id = req.params.id; // get id from url
        
        let categoryDetail = await Category.findOne({ id: id }).populate('eventList');  // find category by id

        if (categoryDetail === null) {  // if no category found
            categoryDetail = new Category({  // create a default error category
                name: "The category you are looking for does not exist.",
                description: "The category you are looking for does not exist.",
                image: "default_event.jpg"
            });
        } 
        
        let eventDetail = categoryDetail.eventList  // get eventList from category
        res.render("events-category-detail", { category: categoryDetail, eventList: eventDetail });
        
    },


    /**
     * Displays the details of a specific event by passing the event ID as a URL parameter
     * and renders the event-detail page
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     */
    renderEventDetails: async function (req, res) {
        let eventID = req.params.param1;
        let query = { id: eventID };
        let eventDetail = await Event.findOne(query);  // find event by id

        if (eventDetail === null) {  // if no event found
            eventDetail = new Event({  // create a default error event
                name: "The event you are looking for does not exist.",
                description: "The event you are looking for does not exist.",
                startDateTime: new Date(),
                durationInMin: 60,
                isActive: true,
                image: "Event_Detail.png",
                capacity: "The event you are looking for does not exist.",
                ticketsAvailable: 200,
                categoryId: "The event you are looking for does not exist."
            });
        }
        res.render("event-detail", { eventDetail: eventDetail });
        
    },


    /**
     * Obtain the number of created, updated and deleted documents and returns it
     * @function
     * @param {string} path - The path to the root directory.
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {JSON} A JSON object containing the number of created, updated and deleted documents.
     */
    getCounts: async function (req, res) {
        try {
            let createdCount = await crudCont.getCreatedCount();
            let updatedCount = await crudCont.getUpdatedCount();
            let deletedCount = await crudCont.getDeletedCount();

            // return number of created, updated and deleted documents
            res.status(200).json({ createdCount, updatedCount, deletedCount });

        } catch (err) {
            console.log(err);
            res.status(400).json({ status: err.message });
        }
    }


};
