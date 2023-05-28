const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Discount";
const discountSchema = new Schema(
  {
    discount_name: {
      type: String,
      required: [true, "Please provide discount name"],
    },
    discount_description: {
      type: String,
      required: [true, "Please provide discount brand"],
      maxlength: 100,
    },
    discount_code: {
      type: String,
      required: [true, "Please provide discount code"],
    },
    discount_type: {
      type: String,
      default: "fixed_amount", // Ex: ["fixed_amount", "percentage"]
      required: [true, "Please provide discount type "],
    },
    discount_value: {
      type: Number, // Ex: ["20000vnđ", "20%"]
      required: [true, "Please provide discount value "],
    },
    discount_start_date: {
      type: Date,
      required: [true, "Please provide discount start date"],
    },
    discount_end_date: {
      type: Date,
      required: [true, "Please provide discount start date"],
    },
    discount_max_uses: {
      type: Number, // Ex: 100 discount code
      required: [true, "Please provide discount max uses "],
    },
    discount_use_count: {
      type: Number, // Ex: How much discount used ? => 21 discount used
      default: 0, // Ex: How much discount used ? => 21 discount used
      //   required: [true, "Please provide discount use count"],
    },
    discount_user_used: {
      type: Array, // Ex: Who used the discount code ?
      default: [],
    },
    discount_max_uses_per_user: {
      type: Number, // Ex: How much discount can each user use?
      required: [true, "Please provide discount uses per user"],
    },
    discount_min_order_value: {
      type: Number, // Ex: Minimum order value to apply discount
      required: [true, "Please provide discount uses per user"],
    },
    discount_by_shopId: {
      type: Schema.Types.ObjectId, // Ex: Minimum order value to apply discount
      ref: "User",
      required: true,
    },
    discount_is_active: {
      type: Boolean, // Ex: Discount is still valid
      default: true,
    },
    discount_applies_to: {
      type: String, // Ex: Specific product to applies discount
      required: true,
      enum: ["all", "specific"],
      default: "all",
    },
    discount_product_specific: {
      type: Array, // Ex: Number product to applies discount if have to specific
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, discountSchema);
