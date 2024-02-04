const posts = require('../models/posts.js');
const pages = require('./pages.js');
const PostController = require('./posts');
const UsersController = require('./users');

exports.rootRequest = (req, res) => {
    return pages.rootRequest(req, res);
}

exports.aboutRequest = (req, res) => {
    return pages.aboutRequest(req, res);
}

// posts api endpoints
exports.createPost = (req, res) => {
    return PostController.createPost(req, res);
}

exports.getPosts = (req, res) => {
    return PostController.getAllPosts(req, res);
}

exports.singlePost = (req, res) => {
    return PostController.singlePost(req, res);
}

exports.deletePost = (req, res) => {
    return PostController.deletePost(req, res);
}

// users api endpoints
exports.getUsers = (req, res) => {
    return UsersController.getUsers(req, res);
}

exports.getUser = (req, res) => {
    return UsersController.singleUser(req, res);
}

exports.createUser = (req, res) => {
    return UsersController.createUser(req, res);
}

exports.updateUser = (req, res) => {
    return UsersController.updateUser(req, res);
}