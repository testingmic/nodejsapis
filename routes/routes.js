const { Router } = require('express');
const pageController = require('../controllers/pages');
const { getUsers, createUser, singleUser, updateUser, authLogin, resetPassword, forgottenPassword } = require('../controllers/users');
const { getPosts, singlePost, createPost, deletePost } = require('../controllers/posts');
const { getWebsites, singleWebsite, updateWebsite, deleteWebsite, createWebsite } = require('../controllers/websites');
const { authenticationValidator } = require("../utils/utils");

const router = Router();

// router endpoints
router.get('/', pageController.rootRequest);
router.get('/about', pageController.aboutRequest);
router.get('/signup', pageController.signupPage);
router.get('/login', pageController.loginPage);

// authentication endpoints
router.post('/api/login', authLogin);
router.post('/api/register', createUser);
router.post('/api/password/forgotten', forgottenPassword);
router.post('/api/password/reset', resetPassword);

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

// the websites route
router.get('/api/websites', authenticationValidator, getWebsites);
router.get('/api/websites/:id', authenticationValidator, singleWebsite);
router.post('/api/websites', authenticationValidator, createWebsite);
router.put('/api/websites/:id', authenticationValidator, updateWebsite);
router.delete('/api/websites/:id', authenticationValidator, deleteWebsite);

// export the routers
module.exports = router;