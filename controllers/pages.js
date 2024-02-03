const resp = require('../utils/utils');

exports.rootRequest = (req, res) => {
    resp.sendResponse(res, 'Request to the root of the application engine!');
}

exports.aboutRequest = (req, res) => {
    resp.sendResponse(res, 'This is the about page request!');
}