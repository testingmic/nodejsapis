exports.respond = (res, message) => {
    return res.send({
        'status': 'success',
        'message': message
    });
}