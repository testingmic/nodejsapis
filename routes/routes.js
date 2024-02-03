const express = require('express');
const requestController = require('../controllers/controller');
const validator = require("../utils/validator");

const router = express.Router();

// router endpoints
router.get('/', requestController.rootRequest);
router.get('/about', requestController.aboutRequest);

// api endpoints
router.get('/api/post', requestController.getPosts);
router.post('/api/post', validator.createPostValidator, requestController.createPost);

module.exports = router;