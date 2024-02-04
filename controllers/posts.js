const resp = require('../utils/utils');
const Post = require('../models/posts');
const dotenv = require("dotenv");
dotenv.config();

class PostController {

    /** API endpoints */
    static getAllPosts(req, res) {
        // offset and limit in the request
        let limit = req.query.limit || req.body.limit || process.env.LIMIT;
        let offset = req.query.offset || req.body.offset || process.env.OFFSET;
        
        const posts = Post.find().skip(offset).limit(limit).select('_id title body').then((result) => {
            return res.json({
                status: 'success',
                message: result
            });
        }).catch((err) => {
            return res.status(400).json(resp.errorHandler(err));
        });
    }
    
    static singlePost(req, res) {
        const post = Post.findById({_id: req.params.post_id }).select('_id title body').then((result) => {
            return res.json({
                status: 'success',
                message: result
            });
        }).catch((err) => {
            return res.status(404).json(resp.errorHandler(err));
        });
    }

    static createPost(req, res) {
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

    static deletePost(req, res) {
        const post = Post.findByIdAndDelete(req.params.post_id).then((result) => {
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

}

module.exports  = PostController;