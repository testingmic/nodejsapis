// initialize the main package
const express = require("express");
const app = express();

// invoke other important packages
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// connect to the db
mongoose.connect(process.env.MONGO_URI).then((data) => {
    console.log("DB connection successful!");
}).catch((err) => {
    console.log(`DB Connection error: ${err.message}`);
});

// load the routes
const routes = require('./routes/routes');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// handle the request
app.use("/", routes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Node API is listening on port: ${port}`)
});