const express = require('express');
const morgan = require('morgan');
const app = express();

// load the routes
const routes = require('./helpers/routes');

// middleware
app.use(morgan('dev'));

app.get('/', routes.baseRequest);

const port = 3000;
app.listen(port, () => {
    console.log(`Node API is listening on port: ${port}`)
});