/**
 * Express module
 * @requires express
 * @const
 */
const express = require("express");

/**
 * Category controller to call functions
 * @type {object}
 * @const
 */
const categoryCont = require("../controllers/category-controller");

/**
 * Express Router for handling events.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * Handle HTTP POST requests to the /add path.
 * Route to add a new category by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.post("/add", function (req, res) {
  categoryCont.addCategoryAPI(req, res);
});

/**
 * Handle HTTP GET requests to the /list path.
 * Route to list all the categories by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/list", function (req, res) {
  categoryCont.listAllCategoriesAPI(req, res);
});

/**
 * Handle HTTP DELETE requests to the /delete path.
 * Route to delete a category by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.delete("/delete", function (req, res) {
  categoryCont.deleteCategoryAPI(req, res);
});

/**
 * Handle HTTP PUT requests to the /update path.
 * Route to update a category by sending the data through the body of the HTTP request in a JSON format.
 * @function
 * @param {string} path - The express path
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.put("/update", function (req, res) {
  categoryCont.updateCategoryAPI(req, res);
});

router.get("/g1-stats", function (req, res) {
  categoryCont.getCounts(req, res);
});

router.post("/list-events-with-categoryID", function (req, res) {
  categoryCont.getEventsWithCategoryID(req, res);
});

module.exports = router;
