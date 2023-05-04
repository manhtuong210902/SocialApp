const express = require('express');
const router = express.Router();
//
const userController = require('../controllers/userController');
const authenToken = require('../middleware/auth');

router.get('/', authenToken, userController.loadUser);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/users', authenToken, userController.getFullUser);

router.put('/upload', authenToken, userController.updateAvatar);

module.exports = router;
