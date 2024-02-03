const resp = require('../utils/utils');

exports.rootRequest = (req, res) => {
    resp.respond(res, 'Request to the root of the application engine!');
}

exports.aboutRequest = (req, res) => {
    resp.respond(res, 'This is the about page request!');
}