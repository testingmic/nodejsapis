const mongoose = require('mongoose');
const bcrypt =  require("bcrypt");

const { isEmail, isMobilePhone } = require('validator');

const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'The firstname is required.'],
        minLength: [3, 'The minimum length for firstname is 3'],
        maxLength: [64, 'The maximum length for the firstname is 64']
    },
    account_id: {
        type: String
    },
    lastname: {
        type: String,
        required: [true, 'The lastname is required.'],
        minLength: 4,
        maxLength: 32
    },
    email: {
        type: String,
        required: [true, 'The email is required.'],
        minLength: [4, 'The minimum length of the email address is 4'],
        maxLength: [64, 'The maximum length of the email address should be 64'],
        validate: [isEmail, 'Please enter a valid email address.'],
        unique: true,
        lowercase: true
    },
    phonenumber: {
        type: String,
        required: [true, 'The phonenumber is required.'],
        minLength: 10,
        maxLength: 13,
        validate: [isMobilePhone, 'Please enter a valid phone number']
    },
    description: {
        type: String
    },
    is_admin: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'The user\'s password is required.'],
        minLength: 6,
        maxLength: 32
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'suspended']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

usersSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

usersSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email: email});
    if(user) {
        let verifyPassword = await bcrypt.compare(password, user.password);
        if(verifyPassword) {
            return user;
        }
     }
     throw Error(`We could not validate the credentials you entered.`);
}

module.exports = mongoose.model("Users", usersSchema);