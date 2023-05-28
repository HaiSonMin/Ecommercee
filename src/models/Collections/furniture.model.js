const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Furniture";
const furnitureSchema = new Schema(
  {
    furniture_brand: {
      type: String,
      required: [true, "Please provide furniture brand"],
    },
    furniture_material: {
      type: String,
      required: [true, "Please provide furniture material"],
    },
    furniture_color: {
      type: [String],
      required: [true, "Please provide furniture color "],
    },
    furniture_origin: {
      type: String,
      required: [true, "Please provide furniture origin "],
    },
    furniture_shopId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide shopId"],
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, furnitureSchema);
