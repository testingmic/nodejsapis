const resp = require('./utils');

const requestAuthentication = (req, res, next) => {
    console.log('Handling authentication');
    next();
}

const rootRequest = (req, res) => {
    resp.respond(res, 'Request to the root of the application engine!');
}

const aboutRequest = (req, res) => {
    resp.respond(res, 'This is the about page request!');
}

module.exports = {
    requestAuthentication, rootRequest, aboutRequest
}