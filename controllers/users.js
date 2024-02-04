const resp = require("../utils/utils");
const User = require("../models/users");

class UsersController {

    static getUsers = (req, res) => {
        // offset and limit in the request
        let limit = req.query.limit || req.body.limit || 1000;
        let offset = req.query.offset || req.body.offset || 0;
    
        const users = User.find().select(`_id firstname lastname email phonenumber status created_at`).skip(offset).limit(limit).then((result) => {
            return res.status(200).json({
                status: 'success',
                message: result
            });
        }).catch((err) => {
            return res.status(400).json(resp.errorHandler(err));
        });
    }
    
    static singleUser = (req, res) => {
        const user = User.findById({_id: req.params.user_id }).select(`_id firstname lastname email phonenumber status created_at`).then((result) => {
            return res.status(200).json({
                status: 'success',
                message: result
            });
        }).catch((err) => {
            return res.status(400).json(resp.errorHandler(err));
        });
    }
    
    static createUser = async (req, res) => {
    
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

}

module.exports = UsersController;