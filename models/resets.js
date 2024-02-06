const mongoose = require("mongoose");

const resetSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Reset', resetSchema);