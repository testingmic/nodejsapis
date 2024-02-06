const resp = require("../utils/utils");
const User = require("../models/users");
const Accounts = require("../models/accounts");
const Resets = require("../models/resets");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const { isEmail } = require("validator");
const dotenv = require("dotenv");

dotenv.config();
class UsersController {

    static getUsers = (req, res) => {
        
        // offset and limit in the request
        let limit = req.query.limit || req.body.limit || process.env.LIMIT;
        let offset = req.query.offset || req.body.offset || process.env.OFFSET;

        let filter = {};
        ['account_id', 'email', 'phonenumber', 'status', 'is_admin'].forEach((value) => {
            if(req.body[value]) {
                filter[value] = req.body[value];
            }
        });

        if(req.body.is_admin && parseInt(req.body.is_admin) === 1) {
            if(parseInt(req.body.userData.is_admin) !== 1) {
                filter['is_admin'] = 0;
            }
        }

        if(req.body.firstname || req.body.lastname) {
            filter = { firstname: { $regex: (req.body.firstname || req.body.lastname), $options: 'i' } };
        }
  
        const users = User.find(filter).select(process.env.USER_COLUMNS).skip(offset).limit(limit).then((result) => {
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

        const user = User.findById({_id: req.params.user_id }).select(process.env.USER_COLUMNS).then((result) => {
            return res.status(200).json({
                status: 'success',
                message: result
            });
        }).catch((err) => {
            return resp.sendResponse(res, `The user could not be found.`, 'not_found');
        });
    }

    static createUser = async (req, res) => {

        try {

            if(req.body.is_admin && (req.body.userData !== 1)) {
                if(parseInt(req.body.is_admin) === 1) {
                    return res.status(400).json(resp.sendResponse(res, 'You do not have the required permission to create an admin user', 'error'));
                }
            }

            req.body.updated_at = Date.now();
            req.body.account_id = req.body.account_id || 0;
    
            let user_account_id = req.body.account_id;
    
            const user = new User(req.body);
            const result = await user.save();
    
            if (!req.body.account_id) {
                const accountObj = new Accounts({ user_id: result._id });
                const acc = await accountObj.save();
                const objectId = new mongoose.Types.ObjectId(acc._id);
                user_account_id = objectId.toHexString();
                await User.updateOne({ _id: result._id }, { account_id: user_account_id });
            }
    
            const token = resp.createAuthToken(result._id);
            // res.cookie('jwtCookie', token, { httpOnly: true, maxAge: process.env.MAXTOKENDAYS * 24 * 60 * 60 * 1000 });
    
            return res.status(201).json({
                status: 'success',
                message: {
                    result: `${result.firstname} ${result.lastname} account was successfully created`,
                    token: {
                        '_id': result._id,
                        'account_id': user_account_id,
                        'token': token,
                        'created_at': result.created_at
                    }
                }
            });

        } catch (err) {
            return res.status(400).json(resp.errorHandler(err, req));
        }

    };

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

    static resetPassword = async (req, res) => {

        if(!req.body.token || req.body.token && req.body.token.length < 16) {
            return resp.sendResponse(res, 'The token is required and must be at least 16 characters long.', 'error');
        }
        else if(!req.body.password) {
            return resp.sendResponse(res, 'The password variable is required.', 'error');
        }
        else if(req.body.password.length < 6) {
            return resp.sendResponse(res, 'The password must be at least 6 characters long.', 'error');
        }
        else if(req.body.password > 32) {
            return resp.sendResponse(res, 'The maximum length of the password must be 32 characters long.', 'error');
        }
        else if(!req.body.confirm_password) {
            return resp.sendResponse(res, 'The confirm_password variable is required.', 'error');
        }
        else if(req.body.password !== req.body.confirm_password) {
            return resp.sendResponse(res, 'The password and confirm_password values do not match.', 'error');
        }

        try {

            const token = await Resets.findOne({token: req.body.token, status: 'pending'});
            if(!token) {
                return  resp.sendResponse(res, 'You have submitted an invalid token.', 'error');
            }

            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(req.body.password, salt);

            await User.updateOne({email: token.email}, {password: password});
            await Resets.updateOne({ token: req.body.token }, { status: 'completed'});
            
            return res.status(200).json({
                'status': 'success',
                'message': 'The password request was successfully processed.'
            });
            
        } catch(err) {
            return res.status(400).json(resp.errorHandler(err));
        }

    }

    static forgottenPassword = async (req, res) => {

        if(!req.body.email) {
            return resp.sendResponse(res, 'The email address is required', 'error');
        }

        try {

            const user = await User.findOne({email: req.body.email}).select(process.env.USER_COLUMNS);
            if(!user) {
                return resp.sendResponse(res, 'No user was found with the specified email address.', 'error');
            }

            await Resets.updateMany({email: req.body.email, status: 'pending'}, {status: 'cancelled'});

            const objectId = new mongoose.Types.ObjectId(user._id).toHexString();
            const token = resp.generateRandomString(32);
            const resetObj = new Resets({email: user.email, user_id: objectId, token: token, status: 'pending'});
            await resetObj.save();

            const message = `Hello ${user.firstname} ${user.lastname} you requested for a password reset.  Use this token to reset your password: ${token}`;

            resp.sendEmail( {
                from: process.env.EMAIL, 
                to: user.email,
                subject: 'Password Reset Request',
                text: message,
                html: `<p>${message}</p>`
            });
            
            return res.status(200).json({
                status: 'success',
                message: 'Check the provided email address for the verification token'
            });

        } catch(err) {
            return res.status(400).json(resp.errorHandler(err));
        }

    }

}

module.exports = UsersController;