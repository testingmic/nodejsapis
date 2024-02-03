const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'The firstname is required.',
        minLength: 4,
        maxLength: 64
    },
    lastname: {
        type: String,
        required: 'The lastname is required.',
        minLength: 4,
        maxLength: 32
    },
    email: {
        type: String,
        required: 'The email is required.',
        minLength: 4,
        maxLength: 64
    },
    phonenumber: {
        type: String,
        required: 'The phonenumber is required.',
        minLength: 10,
        maxLength: 13
    },
    description: {
        type: String
    },
    gender: {
        type: String
    }
});

module.exports = mongoose.model("Users", usersSchema);