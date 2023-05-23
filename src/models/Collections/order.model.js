const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Order";
// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    totalAmount: {
      type: Number,
      required: [true, "Please provide price"],
    },
    orderStatus: {
      type: Number,
    },
    processedBy: {
      type: Number,
      required: [true],
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide customer id"],
      index: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, orderSchema);
