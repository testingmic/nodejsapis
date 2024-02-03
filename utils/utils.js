exports.sendResponse = (res, message, status = 'success') => {
    return res.send({
        'status': status,
        'message': message
    });
}

exports.errorHandler = (error) => {

    const errorMessages = [];
    const errorObject = error.errors;

    // Loop through the object keys
    for (const key in errorObject) {
        if (errorObject.hasOwnProperty(key)) {
            const error = errorObject[key];
            if (error.hasOwnProperty("message")) {
                console.log(error);
                errorMessages.push(error.message);
            }
        }
    }

    // Loop through the main error object
    return {
        'status': 'error',
        'message': errorMessages
    };

}

exports.authenticationValidator = (req, res, next) => {
    // authentication verification
    let auth_token = parseInt(req.query.token) || parseInt(req.body.token);
    if(!Boolean(auth_token) || auth_token !== 12345) {
        let message = !auth_token ? "Auth token was not submitted in the request." : "An invalid token was submitted for validation.";
        return res.status(403).json({
            status: 'Error',
            message: `Authentication failed. ${message}`
        });
    }
    next();
}