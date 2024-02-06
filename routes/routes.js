const { Router } = require('express');
const pageController = require('../controllers/pages');
const { getUsers, createUser, singleUser, updateUser, authLogin, resetPassword } = require('../controllers/users');
const { getPosts, singlePost, createPost, deletePost } = require('../controllers/posts');
const { authenticationValidator } = require("../utils/utils");

const router = Router();

// router endpoints
router.get('/', pageController.rootRequest);
router.get('/about', pageController.aboutRequest);
router.get('/signup', pageController.signupPage);
router.get('/login', pageController.loginPage);

// post api requests
router.get('/api/posts', authenticationValidator, getPosts);
router.get('/api/post/:post_id', authenticationValidator, singlePost);
router.post('/api/post/', authenticationValidator, createPost);
router.delete('/api/post/:post_id', authenticationValidator, deletePost);

// user api requests
router.get('/api/users', authenticationValidator, getUsers);
router.get('/api/users/:user_id', authenticationValidator, singleUser);
router.post('/api/users', createUser);
router.put('/api/users/:user_id', authenticationValidator, updateUser);

// authentication endpoints
router.post('/api/login', authLogin);
router.post('/api/register', createUser);
router.post('/api/password/reset', resetPassword);

// export the routers
module.exports = router;