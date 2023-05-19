const mongoose = require("mongoose");

const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "MenuType";
// Declare the Schema of the Mongo model
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const menuTypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      required: [true, "Please provide type name"],
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, menuTypeSchema);
