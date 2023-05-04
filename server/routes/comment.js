const express = require('express');
const router = express.Router();
//
const commentController = require('../controllers/commentController');
const authenToken = require('../middleware/auth');

router.post('/add', authenToken, commentController.add);

router.post('/:commentId/reply', authenToken, commentController.response);
router.get('/:id', authenToken, commentController.getByPostId);
router.get('/:commentId/reply', authenToken, commentController.getResponse);

module.exports = router;
