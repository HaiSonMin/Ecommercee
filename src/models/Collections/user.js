const mongoose = require("mongoose");

const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "User";
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide full name"],
      maxlength: 50,
    },
    contact: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Please provide valid email",
      ],
      unique: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: [true, "Please provide user name"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    siteInfoId: {
      type: mongoose.Types.ObjectId,
      ref: "SiteInfo",
      required: true,
      index: true,
    },
    shippingId: {
      type: mongoose.Types.ObjectId,
      ref: "Shipping",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, userSchema);
