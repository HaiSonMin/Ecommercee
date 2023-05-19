const mongoose = require("mongoose");

const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Shipper";
// Declare the Schema of the Mongo model
const shipperSchema = new mongoose.Schema(
  {
    shipperInfo: {
      type: String,
      required: [true, "Please provide info shipper "],
    },
    shipperName: {
      type: String,
      required: [true, "Please provide shipper name"],
    },
    shipperImage: {
      type: String,
    },
    time: {
      type: Date,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, shipperSchema);
