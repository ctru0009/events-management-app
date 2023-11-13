const mongoose = require("mongoose");

const DEFAULT_DESC = "No description available";
const DEFAULT_IMG = "default_event.jpg";
// Image taken from https://unsplash.com/photos/bzdhc5b3Bxs

/**
 * Schema for an event category.
 * @type {mongoose.Schema}
 * @property {string} id - The unique id of the category.
 * @property {string} name - The name of the category.
 * @property {string} description - The description of the category.
 * @property {string} image - The image of the category.
 * @property {Date} createdDate - The date the category was created.
 * @property {Array} eventList - The list of events in the category.
 */
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    default:
      /**
       * Generates a random category id.
       * @function
       * @returns {string} The random category id.
       */
      function generateCategoryId() {
        // The id will be in the form of CXX-DDDD where C is a capital letter
        // and X is a random capital letter or number and D is a random number
        let id = "C";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Generate 2 random characters
        for (let i = 0; i < 2; i++) {
          id += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }

        id += "-";
        // Generate 4 random numbers
        for (let i = 0; i < 4; i++) {
          id += Math.floor(Math.random() * 10);
        }
        return id;
      },
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
    },
  },
  description: {
    type: String,
    default: DEFAULT_DESC,
  },
  image: {
    type: String,
    default: DEFAULT_IMG,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  eventList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
