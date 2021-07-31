const mongoose = require("mongoose");

const currentWeekSchema = mongoose.model(
  "currentWeekProducts",
  new mongoose.Schema({
    id: { type: String, ref: 'Product', require: true },
    productName: String,
    productDetails: String,
    productImage: String,
    amountOrdered: Number,
    price: Number
  },
    { timestamps: true })
);

module.exports = currentWeekSchema;
