
/**
 * CRUD model from the database.
 * @type {object}
 * @const
 */
const crud = require("../models/crud.js");

/**
 * Initializes operation counters for "create," "update," and "delete" operations.
 * If a counter doesn't exist, it creates a new one.
 * @async
 * @function
 */
async function initOpsCounter() {
  const ops = ["create", "update", "delete"];
  for (let i = 0; i < ops.length; i++) {
    let count = await crud.findOne({ name: ops[i] });
    if (count == null) {
      let newCount = new crud({
        name: ops[i],
      });
      await newCount.save();
    }
  }
}
/**
 * Increases the "create" operation count by 1.
 * @async
 * @function
 */
async function increaseCreatedCount() {
  let crudOps = await crud.findOneAndUpdate(
    { name: "create" },
    { $inc: { count: 1 } },
    { new: true }
  );
}
/**
 * Increases the "update" operation count by 1.
 * @async
 * @function
 */
async function increaseUpdatedCount() {
  let crudOps = await crud.findOneAndUpdate(
    { name: "update" },
    { $inc: { count: 1 } },
    { new: true }
  );
}
/**
 * Increases the "delete" operation count by 1.
 * @async
 * @function
 */
async function increaseDeletedCount() {
  let crudOps = await crud.findOneAndUpdate(
    { name: "delete" },
    { $inc: { count: 1 } },
    { new: true }
  );
}
/**
 * Gets the count of "create" operations.
 * @async
 * @function
 * @returns {number} The count of "create" operations.
 */
async function getCreatedCount() {
  let count = await crud.findOne({ name: "create" });
  return count.count;
}
/**
 * Gets the count of "update" operations.
 * @async
 * @function
 * @returns {number} The count of "update" operations.
 */
async function getUpdatedCount() {
  let count = await crud.findOne({ name: "update" });
  return count.count;
}
/**
 * Gets the count of "delete" operations.
 * @async
 * @function
 * @returns {number} The count of "delete" operations.
 */
async function getDeletedCount() {
  let count = await crud.findOne({ name: "delete" });
  return count.count;
}

module.exports = {
  initOpsCounter: initOpsCounter,
  increaseCreatedCount: increaseCreatedCount,
  increaseUpdatedCount: increaseUpdatedCount,
  increaseDeletedCount: increaseDeletedCount,
  getCreatedCount: getCreatedCount,
  getUpdatedCount: getUpdatedCount,
  getDeletedCount: getDeletedCount,
};
