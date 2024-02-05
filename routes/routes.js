const { Router } = require('express');
const pageController = require('../controllers/pages');
const userController = require('../controllers/users');
const postController = require('../controllers/posts');

const router = Router();

// router endpoints
router.get('/', pageController.rootRequest);
router.get('/about', pageController.aboutRequest);
router.get('/signup', pageController.signupPage);
router.get('/login', pageController.loginPage);

// post api requests
router.get('/api/posts', postController.getPosts);
router.get('/api/post/:post_id', postController.singlePost);
router.post('/api/post/', postController.createPost);
router.delete('/api/post/:post_id', postController.deletePost);

// user api requests
router.get('/api/users', userController.getUsers);
router.get('/api/users/:user_id', userController.singleUser);
router.post('/api/users', userController.createUser);
router.put('/api/users/:user_id', userController.updateUser);

// export the routers
module.exports = router;