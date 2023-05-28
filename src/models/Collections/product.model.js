const { set } = require("lodash");
const { Schema, model } = require("mongoose"); // Erase if already required
const slugify = require("slugify");
const COLLECTION_NAME = "Product";
// Declare the Schema of the Mongo model
const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 100,
    },
    product_slugify: {
      type: String,
    },
    product_price: {
      type: Number,
      min: [1000, "Rating must be getter than 1000"],
      required: [true, "Please provide price"],
    },
    product_thumb: {
      type: String,
    },
    product_description: {
      type: String,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_ratingAverage: {
      type: Number,
      default: 4,
      min: [1, "Rating must be getter than 1"],
      max: [5, "Rating must be less then 5"],
      set: (val) => Math.round((val * 10) / 10),
    },
    product_type: {
      type: String,
      required: [true, "Please provide product type"],
      enum: ["Electronic", "Clothing", "Furniture", "KitchenTool", "Book"],
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: [true, "Please provide product attribute"],
    },
    product_shopId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide shopId"],
    },
    isDraft: {
      type: Boolean,
      index: true,
      default: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      index: true,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// productSchema.pre("findOneAndUpdate", function (next) {
//   this.product_slugify = slugify(this.product_name, { lower: true });
//   next();
// });

productSchema.pre("save", function (next) {
  this.product_slugify = slugify(this.product_name, { lower: true });
  next();
});

// Create index for search
productSchema.index({ product_name: "text", product_description: "text" });

//Export the model
module.exports = model(COLLECTION_NAME, productSchema);
