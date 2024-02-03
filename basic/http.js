const http = require("http");
const {divide, sum, multiply} = require("./helpers/helpers");

const response = "This is the response code: " + sum(200, 3343);

const server = http.createServer((req, res) => {
    res.end(response);
});

server.listen(3000);