// initialize the main package
const express = require("express");

// invove rate limiting
const rateLimit = require("express-rate-limit");

// add helmet and compress response
const helmet = require("helmet");
const compress = require("compression");

// invoke other important packages
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

// add rate limiting and compress the response
const limiter = rateLimit({
    windowMs: process.env.TIMER * 60 * 1000,
    max: process.env.RATING
});

const app = express();

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

// requests made
app.use(helmet());

// compress the response
app.use(compress());

// convert all request body to json
app.use(express.json());

// rate limit the requests
app.use(limiter);

// handle the request
app.use("/", routes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Node API is listening on port: ${port}`)
});