const express = require('express');
const router = express.Router();
//
const authenToken = require('../middleware/auth');
const postController = require('../controllers/postController');

const uploadCloud = require('../middleware/uploader');

router.get('/', postController.getFull);
router.get('/me', authenToken, postController.getByUser);
router.post('/add', authenToken, uploadCloud.single('image'), postController.add);
router.get('/:id', authenToken, postController.getById);

router.delete('/:id', authenToken, postController.delete);
router.put('/:id', authenToken, uploadCloud.single('image'), postController.update);
router.put('/:id/like', authenToken, postController.updateLike);

module.exports = router;
