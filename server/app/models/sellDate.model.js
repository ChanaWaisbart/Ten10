const mongoose = require("mongoose");

const dateSchema = mongoose.model(
  "sellDeadline",
  new mongoose.Schema({
    id: String,
    date: Date,
  },
    { timestamps: true })
);

module.exports = dateSchema;