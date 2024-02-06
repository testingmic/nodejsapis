const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require("../models/users");
const crypto = require("crypto");

dotenv.config();

const maxAge = process.env.MAXTOKENDAYS * 24 * 60 * 60;
exports.createAuthToken  = (_id) => {
    return jwt.sign({ _id }, process.env.JWTSECRET, {
        expiresIn: maxAge
    });
}

exports.generateRandomString = (length) => {
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    const randomString = bytes.toString('hex').slice(0, length);
    return randomString;
}

exports.sendEmail = async (mailOptions) => {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

exports.sendResponse = (res, message, status = 'success') => {
    let istatus = status == 'success' ? 200 : (status == 'not_found' ? 404 : 400);
    return res.status(istatus).send({
        'status': status,
        'message': message
    });
}

exports.errorHandler = (error, req = {}) => {

    const errorMessages = {};
    const errorObject = error.errors;

    if(error.code === 11000) {
        errorMessages['email'] = `There is an existing user with the email: ${req.body.email || ""}`;
    }

    // Loop through the object keys
    for (const key in errorObject) {
        if (errorObject.hasOwnProperty(key)) {
            const error = errorObject[key];
            if (error.hasOwnProperty("message")) {
                console.log(error.properties);
                errorMessages[error.path] = error.message;
            }
        }
    }

    return {
        'status': 'error',
        'message': errorMessages
    };

}

exports.authenticationValidator = (req, res, next) => {
    const token = req.cookies.jwtCookie;
    if(!token) {
        return res.status(403).send({
            'status': 'error',
            'message': 'Sorry you do not have the required permissions to perform this request.'
        });
    }

    const invalidToken = 'Invalid Token: An invalid cookie token was parsed in the request.';
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
        if(err) {
            return res.status(403).json({ 'status': 'error', 'message': invalidToken });
        }
        const user = await User.findById({_id: decodedToken._id}).select(process.env.USER_COLUMNS).then((result) => {
            req.body.userData = result;
            next();
        }).catch((err) => {
            return res.status(403).json({ 'status': 'error', 'message': 'the user does not exist.' });
        });
    });
}