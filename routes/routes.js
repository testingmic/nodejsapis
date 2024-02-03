const express = require('express');
const requestController = require('../controllers/controller');

const router = express.Router();

// router endpoints
router.get('/', requestController.rootRequest);
router.get('/about', requestController.aboutRequest);

// post api requests
router.get('/api/post', requestController.singlePost);
router.get('/api/posts', requestController.getPosts);
router.post('/api/post', requestController.createPost);
router.delete('/api/post', requestController.deletePost);

// user api requests
router.get('/api/users', requestController.getUsers);
router.get('/api/users/:id', requestController.getUser);
router.post('/api/users', requestController.createUser);

// export the routers
module.exports = router;