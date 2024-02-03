const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('This is the response using express to the root route.');
});

app.listen(3000);