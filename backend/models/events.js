
/**
 * @requires mongoose
 * @constant
 */
const mongoose = require("mongoose");  // reference to moongoose

/**
 * Default description for events when not provided.
 * @constant {string}
 */
const DEFAULT_DESC = "No description available";

/**
 * Default image URL for events when not provided.
 * @constant {string}
 */
const DEFAULT_IMG = "Event_Detail.png";


/** Mongoose schema for Event model.
 * @type {mongoose.Schema}
 * @property {string} id - id of the event
 * @property {string} name - name of the event 
 * @property {string} description - description of the event 
 * @property {Date} startDateTime - date and time of the event
 * @property {number} durationInMin - duration of the event in minutes
 * @property {string} duration - duration of the event in hours and minutes
 * @property {boolean} isActive - whether an event is active or not 
 * @property {string} image - image of the event
 * @property {number} capacity - capacity of the event
 * @property {number} ticketsAvailable - tickets left available of the event
 * @property {string} categoryId - category id of the event
 * @property {Date} endDateTime - end date and time of the event
 * @property {Array} categoryList - list of categories of the event
 */
const eventSchema = mongoose.Schema({ //create schema for food 
    id: {
        type: String,
        default: function () { 
            /** Function to generate a random event id
             * starts with E
             * followed by 2 random characters
             * followed by a hyphen (-)
             * followed by 4 random digits
             * @returns {string} - random event id
             * */

            // Function to generate a random event id
            let id = "E";
            const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            // generate 2 random characters
            for (let i = 0; i < 2; i++) {
                id += alpha.charAt(Math.floor(Math.random() * alpha.length));
            }
        
            id += "-";
            // generate 4 random digits 
            for (let i = 0; i < 4; i++) {
                id += Math.floor(Math.random() * 10);
            }
            return id;
        }
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Regular expression to check if the name is alphanumeric
                return /^[a-zA-Z0-9 ]+$/.test(value);
            },
            messages: {
                message: "Name must be alphanumeric",
            },
        }
    },
    description: {
        type: String,
        default: function() {
            return DEFAULT_DESC;
        }

    },
    startDateTime: {
        type: Date,
        required: true
    },
    durationInMin: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0; 
            },
            message: 'Duration must be more than 0'
        }


    },
    duration:{
        type: String,
        default: function () {
            /**
             * Function to calculate the duration in hours and minutes 
             * @returns {string} - duration of the event in hours and minutes
             */

            //Function to generate the duration in hours and minutes in a string
            let durationString = "";

            // calculate the number of hours 
            let hour = Math.floor(this.durationInMin / 60);
    
            // calculate the remaining minutes 
            let minute = this.durationInMin % 60;
            
            // updating the hours and minutes
            durationString = ((hour > 0) ? `${hour} hour(s)` : "") + ((minute > 0 && hour > 0) ? " and " : "") + ((minute > 0) ? ` ${minute} minute(s)` :"");
            return durationString;
    
        }

    },
    isActive: {
        type: Boolean,
        default: function() {
            return false;
        }
        
    },
    image: {
        type: String,
        default: function() {
            return DEFAULT_IMG;
        }
    },
    capacity: {
        type: Number,
        default: 1000,
        validate: {
            validator: function (value) {
                return value >= 10 && value <= 2000; 
            },
            message: 'Capacity must be between 10 and 2000 (inclusive)'
        }
    },
    ticketsAvailable: {
        type: Number,
        default: function() {
            return this.capacity;
        }

    },
    categoryId: {
        type: String,
        required: true
    },
    endDateTime: {
        type: Date,
        default: function () {
            /**
             * Function to calculate the end time 
             * @returns {Date} - end time of the event
             */

            // create new Date object 
            let time = new Date(this.startDateTime);  

            // calculate the number of hours 
            let hour = Math.floor(this.durationInMin / 60);

            // calculate the remaining minutes 
            let minute = this.durationInMin % 60;

            // updating the hours and minutes 
            time.setHours(time.getHours() + hour);
            time.setMinutes(time.getMinutes() + minute);

            // convert to a readable format
            return time;

        }
    },
    categoryList: [
        {  
            // reference to category model
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]

});

module.exports = mongoose.model("Event", eventSchema);  