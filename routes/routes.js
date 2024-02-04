const express = require('express');
const requestController = require('../controllers/controller');

const router = express.Router();

// router endpoints
router.get('/', requestController.rootRequest);
router.get('/about', requestController.aboutRequest);

// post api requests
router.get('/api/posts', requestController.getPosts);
router.get('/api/post/:post_id', requestController.singlePost);
router.post('/api/post/', requestController.createPost);
router.delete('/api/post/:post_id', requestController.deletePost);

// user api requests
router.get('/api/users', requestController.getUsers);
router.get('/api/users/:user_id', requestController.getUser);
router.post('/api/users', requestController.createUser);
router.put('/api/users/:user_id', requestController.updateUser);

// export the routers
module.exports = router;