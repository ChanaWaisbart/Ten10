const db = require("../models");
const CurrentWeekProducts = db.CurrentWeekProducts;

// Delete a product with the specified productId in the request
exports.deleteProducts = (req, res) => {
    CurrentWeekProducts.findOneAndRemove(req.params)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.id
                });
            }
            res.send({ message: "product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.id
            });
        });
};


// Create and Save a new product
exports.createProducts = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "product required."
        });
    }
    // Create 
    const newProduct = new CurrentWeekProducts(req.body);
    newProduct.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating new product."
        });
    });
};


// Retrieve and return products from the database.
exports.readProducts = (req, res) => {
    CurrentWeekProducts.find(req.query)
        .then(products => {
            res.send(products)
        })
        .catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: "product doesn't exist."
                });
            }
            else {
                return res.status(500).send({
                    message: error.message || "An error occurred while searching product " + req.query
                });
            }
        });
};


//Update product ordered cart
exports.updateProducts = (req, res) => {
    //Checking the new details
    if (!req.body) {
        return res.status(400).send({
            message: "products details missing"
        });
    }

    //Update product in DB
    CurrentWeekProducts.findOneAndUpdate(req.params, req.body
        , { new: true })
        .then(products => {
            if (!products) {
                return res.status(404).send({
                    message: "product " + req.params.id + " doesn't exist"
                });
            }
            else {
                res.send(products);
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product " + req.params.id + " doesn't exist."
                });
            }
            return res.status(500).send({
                message: "An error occurred while updating product " + req.params.id
            });
        });
};