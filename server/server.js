const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const app = express();
const products = require('./app/utils/data.js').products
const users = require('./app/utils/data.js').users
const orders = require('./app/utils/data.js').orders
const productRouter = require('./app/routes/product.route')
const userRouter = require('./app/routes/user.route')
const orderRouter = require('./app/routes/order.route')
const nextWeekRouter = require('./app/routes/nextWeek.route')
const currWeekRouter = require('./app/routes/currWeek.route')
const deadlineRouter = require('./app/routes/sellDeadline.route')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//insert products to DB
db.Product.find({}).then(res => {
  if (res.length == 0) {
    db.Product.insertMany(products).then(() => {
      // Success
    }).catch(error => {
      console.log(error.message)      // Failure
    });
  }
})


db.CurrentWeekProducts.find({}).then(res => {
  if (res.length == 0) {
    db.Product.find({
      "id": {
        "$in": [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    }).then(products => {
      db.CurrentWeekProducts.insertMany(products).then(() => {
        // Success
      })
        .catch(error => {
          console.log(error.message)      // Failure
        });
    })
      .catch(error => {
        console.log(error.message)      // Failure
      });
  }
}
)

//insert users to DB
db.User.find({}).then(res => {
  if (res.length == 0) {
    db.User.insertMany(users).then(() => {
      // Success
    }).catch(error => {
      console.log(error.message)      // Failure
    });
    db.UserOrders.insertMany(orders).then(() => {
      // Success
    }).catch(error => {
      console.log(error.message)      // Failure
    });
  }
})

//insert first sell deadline to DB
db.sellDeadline.find({}).then(res => {
  if (res.length == 0) {
    db.sellDeadline.insertMany([{"id":1,"date": new Date()}]).then(() => {
      // Success
    }).catch(error => {
      console.log(error.message)      // Failure
    });
  }
})



app.use('/products', productRouter)
app.use('/currentWeekProducts', currWeekRouter)
app.use('/nextWeekProducts', nextWeekRouter)
app.use('/usersOrders', orderRouter)
app.use('/users', userRouter)
app.use('/sellStartDate', deadlineRouter)

