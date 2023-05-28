const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "KitchenTool";
const kitchenToolSchema = new Schema(
  {
    kitchenTool_brand: {
      type: String,
      required: [true, "Please provide kitchenTool brand"],
    },
    kitchenTool_material: {
      type: String,
      required: [true, "Please provide kitchenTool material"],
    },
    kitchenTool_color: {
      type: [String],
      required: [true, "Please provide kitchenTool color "],
    },
    kitchenTool_origin: {
      type: String,
      required: [true, "Please provide kitchenTool origin "],
    },
    kitchenTool_shopId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide shopId"],
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, kitchenToolSchema);
