const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "SiteInfo";
// Declare the Schema of the Mongo model
const siteSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: [true, "Please provide site name"],
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 50,
    },
    contactInfo: {
      type: String,
      maxlength: 50,
    },
    address: {
      type: String,
      required: [true, "Please provide address name"],
      maxlength: 50,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, siteSchema);
