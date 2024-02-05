const { Router } = require('express');
const pageController = require('../controllers/pages');
const { getUsers, createUser, singleUser, updateUser, authLogin, resetPassword } = require('../controllers/users');
const { getPosts, singlePost, createPost, deletePost } = require('../controllers/posts');

const router = Router();

// router endpoints
router.get('/', pageController.rootRequest);
router.get('/about', pageController.aboutRequest);
router.get('/signup', pageController.signupPage);
router.get('/login', pageController.loginPage);

// post api requests
router.get('/api/posts', getPosts);
router.get('/api/post/:post_id', singlePost);
router.post('/api/post/', createPost);
router.delete('/api/post/:post_id', deletePost);

// user api requests
router.get('/api/users', getUsers);
router.get('/api/users/:user_id', singleUser);
router.post('/api/users', createUser);
router.put('/api/users/:user_id', updateUser);

// authentication endpoints
router.post('/api/login', authLogin);
router.post('/api/register', createUser);
router.post('/api/password/reset', resetPassword);

// export the routers
module.exports = router;