const controller = require('../controllers/controllers');

const applyAuthentication = (req, res, next) => {
    console.log(req.rawHeaders);
    console.log('My own middleware loading!!!');
    next();
}

const baseRequest =  (req, res) => {
    return controller.rootRequest(req, res);
};

const aboutRequest = (req, res, next) => {
    return controller.aboutRequest(req, res);
}

module.exports = {
    applyAuthentication, baseRequest, aboutRequest
}