const db = require("../models");
const UserOrders = db.UserOrders;


// Retrieve and return orders from the database.
exports.readUsersOrders = (req, res) => {
  UserOrders.find(req.query)
    .then(orders => {
      if (!orders.length) {
        return res.status(404).send({
          message: "orders " + req.query + " doesn't exist."
        });
      }
      else {
        res.send(orders);
      }
    })
    .catch(error => {
      if (error.kind === 'ObjectId' || error.name === 'NotFound') {
        return res.status(404).send({
          message: "orders doesn't exist."
        });
      }
      else {
        return res.status(500).send({
          message: error.message || "An error occurred while searching orderes " + req.query
        });
      }
    });
};


//Update user cart
exports.updateUsersorders = (req, res) => {
  //Checking the new details
  if (!req.body) {
    return res.status(400).send({
      message: "user cart details missing"
    });
  }

  //Update user cart in DB
  UserOrders.findOneAndUpdate(req.params, req.body
    , { new: true })
    .then(userCart => {
      if (!userCart) {
        return res.status(404).send({
          message: "User cart " + req.params.id + " doesn't exist"
        });
      }
      else {
        res.send(userCart);
      }
    }).catch(error => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User cart " + req.params.id + " doesn't exist."
        });
      }
      return res.status(500).send(
        error.message
        // message: "An error occurred while updating User cart " + req.params.id
      );
    });
};

// Create and Save a new user
exports.createUserOrder = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "user required."
    });
  }

  // Create 
  const newUserOrder = new UserOrders(req.body);
  newUserOrder.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating new user."
    });
  });
};