const mongoose = require("mongoose");
const populate = require("mongoose-autopopulate");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product price cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  images: [
    {
      type: String,
    },
  ],
  size: {
    type: Number,
    required: [true, "Please enter shoe size"],
    maxLength: [2, "Shoe size cannot exceed 2 characters"],
    default: 0.0,
  },
  colorway: {
    type: String,
    required: [true, "Please enter product colorway"],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please select a brand for this product"],
    ref: "Brand",
    autopopulate: true,
  },
  type: {
    type: String,
    required: [true, "Please select type of shoe for this product"],
    enum: {
      values: ["High-tops", "Mid-cut", "Low-tops", "Slip-ons"],
      message: "Please select correct type of shoe for the product",
    },
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product stock cannot exceed 5 characters"],
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      autopopulate: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
productSchema.plugin(populate);
module.exports = mongoose.model("Product", productSchema);
