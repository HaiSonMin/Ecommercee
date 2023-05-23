const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Menu";
// Declare the Schema of the Mongo model
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide menu name"],
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    menuImage: {
      type: String,
    },
    ingredients: {
      type: String,
      required: [true, "Please provide ingredients"],
      maxlength: 100,
    },
    status: {
      type: Number,
    },
    menuTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "MenuType",
      required: true,
      index: true,
    },
    orderDetailId: {
      type: mongoose.Types.ObjectId,
      ref: "OrderDetail",
      required: true,
      index: true,
    },
    ratingBy: {
      type: mongoose.Types.ObjectId,
      ref: "Rating",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, menuSchema);
