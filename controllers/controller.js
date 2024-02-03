const posts = require('../models/posts.js');
const pages = require('./pages.js');
const { createPost, deletePost, singlePost, getPosts } = require('./posts');
const { createUser, getUsers, singleUser } = require('./users');

exports.rootRequest = (req, res) => {
    return pages.rootRequest(req, res);
}

exports.aboutRequest = (req, res) => {
    return pages.aboutRequest(req, res);
}

// posts api endpoints
exports.createPost = (req, res) => {
    return createPost(req, res);
}

exports.getPosts = (req, res) => {
    return getPosts(req, res);
}

exports.singlePost = (req, res) => {
    return singlePost(req, res);
}

exports.deletePost = (req, res) => {
    return deletePost(req, res);
}

// users api endpoints
exports.getUsers = (req, res) => {
    return getUsers(req, res);
}

exports.getUser = (req, res) => {
    return singleUser(req, res);
}

exports.createUser = (req, res) => {
    return createUser(req, res);
}