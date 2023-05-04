const express = require('express');
const router = express.Router();
//
const photoController = require('../controllers/photoController');
const authenToken = require('../middleware/auth');

router.get('/me', authenToken, photoController.getPhotoByMe);

module.exports = router;
