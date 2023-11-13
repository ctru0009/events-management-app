const mongoose = require("mongoose");

/**
 * Schema for CRUD operations in Event Management App.
 * @type {mongoose.Schema}
 * @property {string} name - The name of the operation.
 * @property {number} count - The number of times the operation was performed.
 */
const opsCountSchema = mongoose.Schema({
  name: {
    type: String,
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("CRUD", opsCountSchema);
