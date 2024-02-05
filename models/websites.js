const mongoose = require("mongoose");
const { isURL } = require("validator");

const websiteSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name of the website is required'],
        maxLength: [64, 'The maximum name of the website must be 64']
    },
    main_url: {
        type: String,
        required: [true, 'The main url of the website cannot be empty.'],
        validator: [isURL, 'A valid url is required for the main_url property.']
    },
    idsite: {
        type: Number,
        required: [true, 'The idsite value is required.']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'suspended']
    },
    created_by: {
        type: String,
        required: [true, 'The user_id must be set for the created_by property.'],
        minLenth: 20
    },
    is_verified: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Websites', websiteSchema);