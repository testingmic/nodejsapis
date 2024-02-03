const pages = require('./pages.js');
const resp = require('../utils/utils');
const Post = require('../models/posts');

exports.rootRequest = (req, res) => {
    return pages.rootRequest(req, res);
}

exports.aboutRequest = (req, res) => {
    return pages.aboutRequest(req, res);
}

/** API endpoints */
exports.getPosts = (req, res) => {
    return resp.sendResponse(res, 'Getting the list of all posts.');
}

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    post.save().then((result) => {
        return res.status(200).json({
            status: 'success',
            message: result
        });
    }).catch((err) => {
        return res.status(400).json(resp.errorHandler(err));
    });
}