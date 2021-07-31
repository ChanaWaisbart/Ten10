const db = require("../models");
const sellDeadline = db.sellDeadline;

// Retrieve and return Deadline.
exports.readDeadline = (req, res) => {
    sellDeadline.find(req.query)
        .then(dates => {
            res.send(dates)
        })
        .catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: "Deadline doesn't exist."
                });
            }
            else {
                return res.status(500).send({
                    message: error.message || "An error occurred while reading deadline date"
                });
            }
        });
};


//Update deadline
exports.updateDeadline = (req, res) => {
    //Checking the new details
    if (!req.body) {
        return res.status(400).send({
            message: "date details missing"
        });
    }

    //Update deadline in DB
    sellDeadline.findOneAndUpdate(req.params, req.body
        , { new: true })
        .then(dates => {
            if (!dates) {
                return res.status(404).send({
                    message: "deadline date doesn't exist"
                });
            }
            else {
                res.send(dates);
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "deadline date doesn't exist"
                });
            }
            return res.status(500).send({
                message: "An error occurred while updating deadline date"
            });
        });
};
