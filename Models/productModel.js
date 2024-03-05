const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tha title is required"],
      tirm: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Tha description is required"],
      minlength: [20, "Too short product description"],
    },
    quantity: {
      //how many products we have
      type: Number,
      required: [true, "Tha quantity is required"],
    },
    sold: {
      // how many products we sales
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Tha price is required"],
      trim: true,
      max: [20000, "Too long Product price"], // if the type was string then we will use max length or min length
      // but if the type was number then we will use max or min only without length
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      // main image for each product
      type: String,
      required: [true, "Tha image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong category"],
    },
    subCategory: [
      {
        // maybe product be in many sub category
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      // maybe have brand or not
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      // how people rate product
      type: Number,
      min: [1, "Rating must be equal or above 1"],
      max: [5, "Rating must be equal or below 5"],
    },
    ratingsQuantity: {
      // how many ratings we have
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
