const express = require('express');
const router = express.Router();
//
const searchController = require('../controllers/searchController');
const authenToken = require('../middleware/auth');

router.get('/', authenToken, searchController.searchUser);

module.exports = router;
