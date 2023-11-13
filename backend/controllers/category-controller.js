/**
 * Category model from the database.
 * @type {object}
 * @const
 */
const Category = require("../models/category");

/**
 * Event model from the database.
 * @type {object}
 * @const
 */
const Event = require("../models/events");

/**
 * CRUD controller to call functions
 * @type {object}
 * @const
 */
const crudCont = require("../controllers/crud-controller");

/**
 * Adds a new category to the database.
 * The endpoint respond with a JSON object containing the category ID of the newly added category
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {JSON} A JSON object containing the category ID of the newly added category.
 * @throws {Error} If an error occurs during the addition.
 */
async function addCategoryAPI(req, res) {
  try {
    let aCategory = new Category({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    });

    await aCategory.save();
    await crudCont.increaseCreatedCount();
    res.status(200).json({ id: aCategory.id });
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
}

/**
 * Lists all categories in the database.
 * This endpoint return the list of all categories and the details for their events in a JSON format
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {JSON} A JSON object containing the list of all categories and the details for their events.
 * @throws {Error} If an error occurs during the listing.
 */
async function listAllCategoriesAPI(req, res) {
  try {
    let categories = await Category.find().populate("eventList");
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
}

/**
 * Deletes a category from the database.
 * This endpoint deletes a category by its ID and all the events that are listed in the 'eventList' field
 * and return a JSON object containing the number of deleted documents
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {JSON} A JSON object containing the number of deleted documents.
 * @throws {Error} If an error occurs during the deletion.
 */
async function deleteCategoryAPI(req, res) {
  let id = req.body.categoryId;

  try {
    const category = await Category.findOne({ id: id });
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    let eventList = category.eventList;
    for (let i = 0; i < eventList.length; i++) {
      await Event.deleteOne({ _id: eventList[i]._id });
    }
    let status = await Category.deleteOne({ id: id });
    crudCont.increaseDeletedCount();
    res.status(200).json(status);
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
}

/**
 * Updates a category in the database.
 * This endpoint update category name and description by ID:
 * The ID, new name and description are sent as a JSON object through the request body
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {JSON} A JSON object containing the updated category.
 * @throws {Error} If an error occurs during the update.
 */
async function updateCategoryAPI(req, res) {
  try {
    let id = req.body.categoryId;
    let name = req.body.name;
    let description = req.body.description;
    let image = req.body.image;
    // Check name is character and number only
    let regex = /^[a-zA-Z0-9 ]+$/;
    if (!regex.test(name)) {
      res
        .status(400)
        .json({ status: "Name must be character and number only" });
    } else {
      let updatedCategory = await Category.findOneAndUpdate(
        { id: id },
        { name: name, description: description, image: image },
        { new: true }
      );
      if (updatedCategory != null) {
        crudCont.increaseUpdatedCount();
        res.status(200).json({
          status: "Update successful",
          updatedCategory: updatedCategory,
        });
      } else {
        res.status(400).json({ status: "ID not found" });
      }
    }
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
}

/**
 * Adds a new category to the database.
 * This endpoint adds a new category to the database and redirect to the category list page
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function addCategory(req, res) {
  let aCategory = new Category({
    name: req.body.categoryName,
    description: req.body.categoryDescription
      ? req.body.categoryDescription
      : "No description",
    image: req.body.categoryImage
      ? req.body.categoryImage
      : "default_event.jpg",
  });

  await aCategory.save();
  crudCont.increaseCreatedCount();
  res.redirect("/32182988/event-categories");
}

/**
 * Lists all categories in the database.
 * This endpoint lists all categories in the database
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function listAllCategories(req, res) {
  let categories = await Category.find();
  res.render("category-list", { eventCategories: categories });
}

/**
 * Searches for categories by keyword.
 * This endpoint searches for categories by keyword and redirect to the category list page
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function searchCategoriesByKeyword(req, res) {
  let keyword = req.query.keyword;
  let categories = await Category.find({
    description: { $regex: keyword, $options: "i" }, // i means case insensitive
  });

  res.render("category-list-keyword", {
    eventCategories: categories,
    keyword: keyword,
  });
}

/**
 * Deletes a category from the database.
 * This endpoint deletes a category by its ID.
 * and redirect to the category list page
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function deleteCategoryByID(req, res) {
  let id = req.body.categoryId;
  if ((await Category.findOne({ id: id })) != null) {
    // check if category exists
    await Category.deleteOne({ id: id });
    crudCont.increaseDeletedCount();
    res.redirect("/32182988/event-categories");
  } else {
    res.status(400).send("ID was not found");
  }
}

/**
 * Gets the number of categories in the database.
 * @function
 * @returns {number} The number of categories in the database.
 */
async function getCategoryCount() {
  let count = await Category.countDocuments();
  return count;
}

async function getEventsWithCategoryID(req, res) {
  try {
    let id = req.body.categoryId;

    // Find all events with the given category ID
    let events = await Event.find({ categoryId: id });
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
}

async function getCounts(req, res) {
  try {
    let categoryCount = await getCategoryCount();
    let eventCount = await Event.countDocuments();

    res.status(200).json({
      categoryCount: categoryCount,
      eventCount: eventCount,
    });
  } catch (err) {
    res.status(400).json({ status: err.message });
  }
}

module.exports = {
  addCategoryAPI: addCategoryAPI,
  listAllCategoriesAPI: listAllCategoriesAPI,
  deleteCategoryAPI: deleteCategoryAPI,
  updateCategoryAPI: updateCategoryAPI,
  addCategory: addCategory,
  listAllCategories: listAllCategories,
  searchCategoriesByKeyword: searchCategoriesByKeyword,
  deleteCategoryByID: deleteCategoryByID,
  getCategoryCount: getCategoryCount,
  getCounts: getCounts,
  getEventsWithCategoryID: getEventsWithCategoryID,
};
