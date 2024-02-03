const rootRequest = (req, res) => {
    res.send('Request to the root of the application engine!');
}

const aboutRequest = (req, res) => {
    res.send('This is the about page request!');
}

module.exports = {
    rootRequest, aboutRequest
}