const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: { type: String },
    description: { type: String },
    category: {
      type: String,
      required: true, 
    },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    totalStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Products", productSchema);
