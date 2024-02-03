const express = require('express');
const requestController = require('../controllers/controller');

const router = express.Router();

// router endpoints
router.get('/', requestController.rootRequest);
router.get('/about', requestController.aboutRequest);

// get requests
router.get('/api/post', requestController.singlePost);
router.get('/api/posts', requestController.getPosts);

// post requests
router.post('/api/post', requestController.createPost);

// delete request
router.delete('/api/post', requestController.deletePost);

// export the routers
module.exports = router;