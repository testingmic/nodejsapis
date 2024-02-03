const express = require('express');
const app = express();

// load the routes
const routes = require('./helpers/routes');

app.get('/', routes.baseRequest);

const port = 3000;
app.listen(port, () => {
    console.log(`Node API is listening on port: ${port}`)
});