const mongoose = require("mongoose");

const ProductSchema = mongoose.model(
  "Product",
  new mongoose.Schema({
    id: String,
    productName: String,
    productDetails: String,
    productImage: String,
    amountOrdered: Number,
    price: Number
  },
    { timestamps: true })
);

module.exports = ProductSchema;
