const requestAuthentication = (req, res, next) => {
    console.log('Handling authentication');
    next();
}

const rootRequest = (req, res) => {
    res.send('Request to the root of the application engine!');
}

const aboutRequest = (req, res) => {
    res.send('This is the about page request!');
}

module.exports = {
    requestAuthentication, rootRequest, aboutRequest
}