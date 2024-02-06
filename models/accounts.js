const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    user_id: {
        type: String,
        minLength: [20, 'The minimum length for the user_id is 20']
    }
});

module.exports = mongoose.model('Accounts', accountSchema);