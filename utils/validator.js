exports.createPostValidator = (req, res, next) => {
    
    // title validation
    req.check("title", "The title is required.").notEmpty();
    req.check("title", "The title must be between 4 to 64 characters").isLength({
        min: 4,
        max: 64
    });

    // body validation
    req.check("body", "The body is required.").notEmpty();
    req.check("body", "The body must be between 4 to 2000 characters").isLength({
        min: 4,
        max: 64
    });

    // author validation
    req.check("author", "The author is required.").notEmpty();
    req.check("author", "The author must be between 4 to 64 characters").isLength({
        min: 4,
        max: 64
    });
    
    // get all errors
    const errors = req.validationErrors();

    // return the first error if there is an error
    if(errors) {
        const firstError = errors.map((error) => { error.msg })[0];
        return res.status(400).json({
            status: 'error',
            message: firstError
        });
    }

    next();
}