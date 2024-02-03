const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required.',
        minLength: 4,
        maxLength: 64
    },
    author: {
        type: String,
        required: 'Author of this post is required.',
        minLength: 4,
        maxLength: 32
    },
    body: {
        type: String,
        required: 'The body content is required.',
        maxLength: 2000
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Posts", postsSchema);