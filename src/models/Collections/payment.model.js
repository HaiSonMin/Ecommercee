const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Payment";
// Declare the Schema of the Mongo model
const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide amount price "],
    },
    paidBy: {
      type: String,
      required: [true, "Please provide user has paid"],
    },
    paymentDate: {
      type: Date,
      default: Date.now(),
    },
    processedBy: {
      type: Number,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
      index: true,
    },
    orderId: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: [true, "Please provide order id"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, paymentSchema);
