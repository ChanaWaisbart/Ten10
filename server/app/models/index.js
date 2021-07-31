const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.UserOrders = require("./userOrders.model");
db.Product = require("./product.model");
db.User = require("./user.model");
db.NextWeekProducts = require("./nextWeek.model");
db.CurrentWeekProducts = require("./currWeek.model");
db.sellDeadline = require("./sellDate.model")

module.exports = db;
