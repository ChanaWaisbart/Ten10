const db = require("../models");
const User = db.User;

// Create and Save a new user
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "user required."
    });
  }

  // Create 
  const user = new User(req.body);
  user.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating new user."
    });
  });
};


// Retrieve and return users from the database.
exports.readUsers = (req, res) => {
  User.find(req.query)
    .then(orders => {
      if (!orders.length) {
        return res.status(404).send({
          message: "users " + req.query.id + " doesn't exist."
        });
      }
      else {
        res.send(orders);
      }
    })
    .catch(error => {
      if (error.kind === 'ObjectId' || error.name === 'NotFound') {
        return res.status(404).send({
          message: "users doesn't exist."
        });
      }
      else {
        return res.status(500).send({
          message: error.message || "An error occurred while searching users " + req.query.id
        });
      }
    });
};

//Update user details
exports.updateUser = (req, res) => {
  //Checking the new details
  if (!req.body) {
    return res.status(400).send({
      message: "User details missing"
    });
  }

  //Update user details in DB
  User.findOneAndUpdate({ id: req.body.id }, req.body
    , { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User " + req.body.id + " doesn't exist"
        });
      }
      else {
        res.send(user);
      }
    }).catch(error => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User " + req.body.id + " doesn't exist."
        });
      }
      return res.status(500).send({
        message: "An error occurred while updating user " + req.body.id
      });
    });
};
