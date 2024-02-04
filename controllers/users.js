const resp = require("../utils/utils");
const User = require("../models/users");
const dotenv = require("dotenv");
dotenv.config();
class UsersController {

    static getUsers = (req, res) => {
        // offset and limit in the request
        let limit = req.query.limit || req.body.limit || process.env.LIMIT;
        let offset = req.query.offset || req.body.offset || process.env.OFFSET;
    
        const users = User.find().select(`_id firstname lastname email phonenumber status created_at updated_at`).skip(offset).limit(limit).then((result) => {
            return res.status(200).json({
                status: 'success',
                message: result
            });
        }).catch((err) => {
            return resp.sendResponse(res, err, 'error');
        });
    }
    
    static singleUser = (req, res) => {

        if(!req.params.user_id) {
            return resp.sendResponse(res, `The user_id param is required.`, 'error');
        }

        const user = User.findById({_id: req.params.user_id }).select(`_id firstname lastname email phonenumber status created_at updated_at`).then((result) => {
            return res.status(200).json({
                status: 'success',
                message: result
            });
        }).catch((err) => {
            return resp.sendResponse(res, `The user could not be found.`, 'not_found');
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

    static updateUser = async(req, res) => {

        if(!req.params.user_id) {
            return resp.sendResponse(res, `The user_id param is required.`, 'error');
        }

        const existingUser = await User.findById({_id: req.params.user_id}).then((result) => {
            
        }).catch((err) => {
            return resp.sendResponse(res, `There was no existing found for the specified id: ${req.params.user_id}`, 'not_found');
        });

        if(req.body.email && req.body.email !== existingUser.email) {
            const existingEmail = await User.findOne({ email: req.body.email });
            
            if(existingEmail) {
                return resp.sendResponse(res, `There is an existing user with the specified email: ${req.body.email}`, 'error');
            }
        }

        req.body.updated_at = Date.now();

        const user = User.updateOne({_id: req.params.user_id}, req.body).then((result) => {
            return res.status(200).json({
                status: 'success',
                message: `The record is successfully updated.`
            });
        }).catch((err) => {
            return res.status(400).json(resp.errorHandler(err));
        });

    }

}

module.exports = UsersController;