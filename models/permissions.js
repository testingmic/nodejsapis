const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'The user_id parameter is requried'],
        minLength: [20, 'The mininum length of the user_id must be 24']
    },
    permissions: {
        type: JSON,
        required: [true, 'You need to specify the permissions of this user']
    }
});

module.exports = mongoose.mondel('Permissions', permissionSchema);