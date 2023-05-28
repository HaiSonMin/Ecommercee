const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Electronic";
const electronicSchema = new Schema(
  {
    electronic_name: {
      type: String,
      required: [true, "Please provide electronic name"],
      maxlength: 100,
    },
    electronic_brand: {
      type: String,
      required: [true, "Please provide electronic brand"],
    },
    electronic_material: {
      type: String,
      required: [true, "Please provide electronic material"],
    },
    electronic_origin: {
      type: String,
      required: [true, "Please provide electronic origin "],
    },
    electronic_shopId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide shopId"],
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, electronicSchema);
