const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Clothing";
const clothingSchema = new Schema(
  {
    clothing_name: {
      type: String,
      required: [true, "Please provide clothing name"],
      maxlength: 100,
    },
    clothing_brand: {
      type: String,
      required: [true, "Please provide clothing brand"],
    },
    clothing_material: {
      type: String,
      required: [true, "Please provide clothing material"],
    },
    clothing_color: {
      type: [String],
      required: [true, "Please provide clothing color "],
    },
    clothing_origin: {
      type: String,
      required: [true, "Please provide clothing origin "],
    },
    clothing_shopId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide shopId"],
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, clothingSchema);
