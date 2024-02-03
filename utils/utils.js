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