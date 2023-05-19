const mongoose = require("mongoose");

const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Shipping";
// Declare the Schema of the Mongo model
const shippingSchema = new mongoose.Schema(
  {
    shipmentDetail: {
      type: String,
      required: [true, "Please provide detail info of shipment"],
      maxlength: 50,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    // time: {
    //   type: Date,
    //   default: Date.now(),
    // },
    address: {
      type: String,
      required: [true, "Please provide address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 50,
    },
    shipperId: {
      type: mongoose.Types.ObjectId,
      ref: "Shipper",
      required: [true, "Please provide shipper id"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, shippingSchema);
