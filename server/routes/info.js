const express = require('express');
const router = express.Router();
//
const infoController = require('../controllers/infoController');
const authenToken = require('../middleware/auth');

router.get('/me', authenToken, infoController.getInfoByMe);
router.put('/me', authenToken, infoController.updateInfoByMe);

module.exports = router;
