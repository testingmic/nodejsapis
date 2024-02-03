const resp = require("../utils/utils");
const User = require("../models/users");

exports.getUsers = (req, res) => {
    let offset = req.query.offset || req.body.offset || 0;
    let limit = req.query.limit || req.body.limit || 10;

    const users = User.find().skip(offset).limit(limit).then((result) => {
        return res.status(200).json({
            status: 'success',
            message: result
        });
    }).catch((err) => {
        return res.status(400).json(resp.errorHandler(err));
    });
}

exports.singleUser = (req, res) => {
    const user = User.findById().then((result) => {
        return res.status(200).json({
            status: 'success',
            message: result
        });
    });
}

exports.createUser = async (req, res) => {

    const existingUser = await User.findOne({ email: req.body.email });

    if(existingUser) {
        return res.status(400).json({status: 'error', message: `There is an existing user with the email: ${req.body.email}`});
    }

    const user = new User(req.body);

    user.save().then((result) => {
        return res.status(201).json({
            status: 'success',
            message: result
        });
    }).catch((err) => {
        return res.status(400).json(resp.errorHandler(err));
    });
}