const mongoose = require("mongoose");

const nextWeekSchema = mongoose.model(
  "nextWeekProducts",
  new mongoose.Schema({
      id: { type: String, ref: 'Product', require: [true] },
      productName: String,
      productDetails: String,
      productImage: String,
      amountOrdered: Number,
      price: Number
  },
    { timestamps: true })
);

module.exports = nextWeekSchema;
