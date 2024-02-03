const resp = require('../utils/utils');
const Post = require('../models/posts');

/** API endpoints */
exports.getPosts = (req, res) => {
    // offset and limit in the request
    let limit = req.query.limit || req.body.limit || 1000;
    let offset = req.query.offset || req.body.offset || 0;
    
    const posts = Post.find().skip(offset).limit(limit).select('_id title body').then((result) => {
        return res.json({
            status: 'success',
            message: result
        });
    }).catch((err) => {
        return res.status(400).json(resp.errorHandler(err));
    });
}

exports.singlePost = (req, res) => {
    const post = Post.findById(req.body).select('_id title body').then((result) => {
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
        return res.status(201).json({
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