const mongoose = require("mongoose");


//User schema
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: String,
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    isManager: { type: Boolean, default: false },
    city: { type: String },
    street: { type: String },
    streetNum: { type: Number },
  })
);

module.exports = User;
