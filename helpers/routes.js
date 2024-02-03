const applyAuthentication = (req, res, next) => {
    console.log(req.rawHeaders);
    console.log('My own middleware loading!!!');
    next();
}

const baseRequest =  (req, res) => {
    res.send('This is the response!');
};

const aboutRequest = (req, res) => {
    res.send('This is the about page request');
}

module.exports = {
    applyAuthentication, baseRequest, aboutRequest
}