const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'The first name is required.',
        minLength: 4,
        maxLength: 64
    },
    lastname: {
        type: String,
        required: 'The last name is required.',
        minLength: 4,
        maxLength: 32
    },
    email: {
        type: String,
        required: 'The email address is required.',
        minLength: 4,
        maxLength: 64
    },
    phonenumber: {
        type: String,
        required: 'The phone number is required.',
        minLength: 10,
        maxLength: 13
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model("Users", usersSchema);