const resp = require("../utils/utils");
const User = require("../models/users");
const { isEmail } = require("validator");
const dotenv = require("dotenv");

dotenv.config();
class UsersController {

    static getUsers = (req, res) => {

        console.log('userData: ', req.body.userData);
        
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

        req.body.updated_at = Date.now();
    
        const user = new User(req.body);
    
        user.save().then((result) => {
            const token = resp.createAuthToken(result._id);

            // create a cookie and set in the browser
            res.cookie('jwtCookie', token, { httpOnly: true, maxAge: process.env.MAXTOKENDAYS * 24 * 60 * 60 * 1000 });

            return res.status(201).json({
                status: 'success',
                message: {
                    result: `${result.firstname} ${result.lastname} account was successfully created`,
                    token: {
                        '_id': result._id,
                        'token': token,
                        'created_at': result.created_at
                    }
                }
            });
        }).catch((err) => {
            return res.status(400).json(resp.errorHandler(err, req));
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

    static authLogin = async (req, res) => {

        if(!req.body.email  || (req.body.email && !isEmail(req.body.email))) {
            resp.sendResponse(res, `A valid email is required to login.`);
        }

        try {

            const login = await User.login(req.body.email, req.body.password);
            const token = resp.createAuthToken(login._id);

            // create a cookie and set in the browser
            res.cookie('jwtCookie', token, { httpOnly: true, maxAge: process.env.MAXTOKENDAYS * 24 * 60 * 60 * 1000 });

            return res.json({status: 'success', message: {
                result: 'Account successfully logged in',
                token: {
                    user: login._id,
                    auth_token: token,
                    created_at: Date.now().toString()
                }
            }});

        } catch(err) {
            return resp.sendResponse(res, err.message, 'error');
        }
    }

    static resetPassword = (req, res) => {
        return resp.sendResponse(res, req.body);
    }

}

module.exports = UsersController;