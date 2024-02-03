const express = require('express');
const requestController = require('../controllers/controller');

const router = express.Router();

router.get('/', requestController.rootRequest);
router.get('/about', requestController.requestAuthentication, requestController.aboutRequest);

module.exports = router;