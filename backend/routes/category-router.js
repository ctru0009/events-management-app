const express = require("express");
const path = require("path");
const Category = require("../models/category.js");
const event = require("../models/events.js");
const categoryCont = require("../controllers/category-controller");
const eventCont = require("../controllers/event-controller");

const VIEWS_PATH = path.join(__dirname, "..", "views/");
/**
 * Express Router for handling event categories.
 */
const eventCategoryRouter = express.Router();

// Serve Bootstrap CSS and images
eventCategoryRouter.use(express.static("node_modules/bootstrap/dist/css/"));
eventCategoryRouter.use(express.static("images"));

/**
 * Route to display the form for adding an event category.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventCategoryRouter.get("/add-category", (req, res) => {
    let filePath = VIEWS_PATH + "category-add.html";
    res.sendFile(filePath);
});

/**
 * Route to process the form submission for adding an event category.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventCategoryRouter.post("/add-category", (req, res) => {
    categoryCont.addCategory(req, res);
});

/**
 * Route to display a list of event categories.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventCategoryRouter.get("/event-categories", (req, res) => {
    categoryCont.listAllCategories(req, res);
});

/**
 * Route to search and display filtered event categories.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventCategoryRouter.get("/search-category", (req, res) => {
    categoryCont.searchCategoriesByKeyword(req, res);
});

/**
 * Route to display the details of a specific event.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventCategoryRouter.get("/event/:param1", (req, res) => {
    eventCont.renderEventDetails(req, res);
});

/**
 * Route to display the form for deleting an event category.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventCategoryRouter.get("/delete-category", (req, res) => {
    let filePath = VIEWS_PATH + "category-delete.html";
    res.sendFile(filePath);
});

/**
 * Route to process the form submission for deleting an event category.
 * @function
 * @param {string} path - Express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
eventCategoryRouter.post("/delete-category", (req, res) => {
    categoryCont.deleteCategoryByID(req, res);
});

module.exports = eventCategoryRouter;
