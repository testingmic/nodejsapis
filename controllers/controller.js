const pages = require('./pages.js');
const resp = require('./utils');
const Post = require('../models/posts.js');

exports.rootRequest = (req, res) => {
    return pages.rootRequest(req, res);
}

exports.aboutRequest = (req, res) => {
    return pages.aboutRequest(req, res);
}

/** API endpoints */
exports.getPosts = (req, res) => {
    return resp.respond(res, 'Getting the list of all posts.');
}

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    console.log("Creating post: ", req.body);
}