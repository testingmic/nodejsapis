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
    const posts = Post.find().then((result) => {
        return res.json({
            status: 'success',
            message: result
        });
    }).catch((err) => {
        return res.status(400).json(resp.errorHandler(err));
    });
}

exports.singlePost = (req, res) => {
    const post = Post.findById(req.body).then((result) => {
        return res.json({
            status: 'success',
            message: result
        });
    }).catch((err) => {
        return res.status(404).json(resp.errorHandler(err));
    });
}

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    post.save().then((result) => {
        return res.json({
            status: 'success',
            message: result
        });
    }).catch((err) => {
        return res.status(400).json(resp.errorHandler(err));
    });
}

exports.deletePost = (req, res) => {
    const post = Post.findByIdAndDelete(req.body).then((result) => {
        return res.json({
            status: 'success',
            message: 'The post record was successfully deleted.'
        });
    }).catch((err) => {
        return res.status(400).json({
            status: 'error',
            message: 'The post id was not found.'
        });
    });
}