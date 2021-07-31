const mongoose = require("mongoose");

const userOrdersSchema = mongoose.model(
  "userOrders",
  new mongoose.Schema({
    id: String,
    userId: { type: String, ref: 'User', require: [true] },
    orders: [],
  },
    { timestamps: true })
);

module.exports = userOrdersSchema;
