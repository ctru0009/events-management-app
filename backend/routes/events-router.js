
/**
 * Express module 
 * @requires express
 * @const
 */
const express = require("express");

/**
 * provides path of the current working directory
 * @requires path
 * @const
 */
const path = require("path"); 

/**
 * Express Router for handling events.
 * @type {object}
 * @const
 */
const eventsRouter = express.Router();

/**
 * Path of views folder
 * @requires path
 * @const
 */
const VIEWS_PATH = path.join(__dirname, "..", "views/");

// Serve Bootstrap CSS and images
eventsRouter.use(express.static("node_modules/bootstrap/dist/css"));
eventsRouter.use(express.static("images"));

/**
 * Event controller to call functions 
 * @type {object}
 * @const
 */
const eventCont = require("../controllers/event-controller");


/**
 * Handle HTTP GET requests to the /add-events path.
 * Route to display the form for adding an event.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.get("/add-events", function(req, res){
    filePath = VIEWS_PATH + "events-add.html";
    res.sendFile(filePath);
});


/**
 * Handle HTTP POST requests to the /add-events path.
 * Route to process the form submission for adding an event.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.post("/add-events", eventCont.addEvent);


/**
 * Handle HTTP GET requests to the /list-events path.
 * Route to list all the events.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.get("/list-events", eventCont.listEvent);


/**
 * Handle HTTP GET requests to the /sold-out-events path.
 * Route to list all the events that are sold out.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.get("/sold-out-events", eventCont.listSoldOutEvent);


/**
 * Handle HTTP GET requests to the /category/:id path.
 * Route to display category attributes by passing the category ID as a URL parameter
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.get("/category/:id", eventCont.renderCategoryDetails);


/**
 * Handle HTTP GET requests to the /deleteEvent path.
 * Route to display form to delete an event 
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.get("/deleteEvent", (req, res) => {
  let filePath = VIEWS_PATH + "event-delete.html";
  res.sendFile(filePath);
});


/**
 * Handle HTTP POST requests to the /deleteEvent path.
 * Route to process the form submission for deleting an event.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.post("/deleteEvent", function(req, res){
  let deletedId = req.body.deletedId;
  res.redirect("/qian/deletingEvent?deletedId="+deletedId);
});


/**
 * Handle HTTP GET requests to the /deletingEvent path.
 * Route to delete an event using URL's query string
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventsRouter.get("/deletingEvent", eventCont.deleteEventByID);


module.exports = eventsRouter;
