
/**
 * Express module 
 * @requires express
 * @const
 */
const express = require("express");

/**
 * Express Router for handling events.
 * @type {object}
 * @const
 */
const router = express.Router(); 

/**
 * Event controller to call functions 
 * @type {object}
 * @const
 */
const eventCont = require("../controllers/event-controller");

// /**
//  * CRUD controller to call functions
//  * @type {object}
//  * @const
//  */
// const crudCont = require("../controllers/crud-controller");



/**
 * Handle HTTP GET requests to the /add-events path.
 * Route to add a new event by sending the data through the body of the HTTP request in a JSON format. 
 * @function
 * @param {string} path - The express path 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.post("/add-events", eventCont.addEventAPI);


/**
 * Handle HTTP GET requests to the /list-events path.
 * Route to list all the events by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/list-events", eventCont.listEventAPI);


/**
 * Handle HTTP DELETE requests to the /delete-event path.
 * Route to delete an event by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.delete("/delete-event", eventCont.deleteEventAPI);


/**
 * Handle HTTP PUT requests to the /update-event path.
 * Route to update an event by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.put("/update-event", eventCont.updateEventAPI);


/**
 * Handle HTTP GET requests to the /display-event/:eventID path.
 * Route to display an event by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/display-event/:eventID", eventCont.displayEventAPI);


/**
 * Handle HTTP GET requests to the /g2-stats path.
 * Route to obtain the counts of created, updated and deleted data by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/g2-stats", eventCont.getCounts);



module.exports = router; 





















