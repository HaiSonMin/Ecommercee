const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Customer";
// Declare the Schema of the Mongo model
const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide first name"],
      maxlength: 50,
    },
    last_name: {
      type: String,
      required: [true, "Please provide last name"],
      maxlength: 50,
    },
    middle_name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Please provide valid email",
      ],
      unique: true,
      maxlength: 50,
    },
    phone_number: {
      type: String,
      maxlength: 50,
    },
    landline: {
      type: String,
      required: true,
      maxlength: 50,
    },
    image: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please provide username"],
      maxlength: 50,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      maxlength: 50,
    },
    status: {
      type: Number,
    },
    ratingBy: {
      type: mongoose.Types.ObjectId,
      ref: "Rating",
      required: true,
      index: true,
    },
    menuId: {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, customerSchema);
