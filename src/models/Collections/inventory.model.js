const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Inventory";
const inventorySchema = new Schema(
  {
    inventory_name: {
      type: String,
      required: [true, "Please provide name product"],
    },
    inventory_productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide productId"],
    },
    inventory_location: {
      type: String,
      default: "unKnow",
    },
    inventory_stock: {
      type: Number,
      required: [true, "Please provide stock "],
    },
    inventory_shopId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide shop Id"],
    },
    inventory_reservation: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, inventorySchema);
