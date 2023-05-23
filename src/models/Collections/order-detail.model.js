const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "OrderDetail";
// Declare the Schema of the Mongo model
const orderDetailSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
    },
    noOfService: {
      type: Number,
      required: [true, "Please provide price"],
    },
    totalAmount: {
      type: Number,
    },
    menuId: {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
      required: [true, "Please provide paymentId"],
    },
    orderId: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: [true, "Please provide paymentId"],
    },
    paymentId: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: [true, "Please provide paymentId"],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, orderDetailSchema);
