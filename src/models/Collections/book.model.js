const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Book";
const bookSchema = new Schema(
  {
    book_author: {
      type: [String],
      required: [true, "Please provide book brand"],
    },
    book_category: {
      type: String,
      required: [true, "Please provide book category"],
    },
    book_material: {
      type: String,
      required: [true, "Please provide book material"],
    },
    book_color: {
      type: [String],
      required: [true, "Please provide book color"],
    },
    book_origin: {
      type: String,
      required: [true, "Please provide book origin"],
    },
    book_released: {
      type: Date,
      required: [true, "Please provide book released"],
    },
    book_shopId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide shopId"],
    },
  },
  { timestamps: true }
);

module.exports = model(COLLECTION_NAME, bookSchema);
