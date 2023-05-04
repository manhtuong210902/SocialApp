const Photo = require('../models/Photo');

class photoController {
    //@route [GET]: api/infos/me
    //@desc get full infos by me
    //@access private
    async getPhotoByMe(req, res, next) {
        try {
            const photo = await Photo.findOne({ userId: req.userId });
            if (!photo) {
                return res.json({
                    success: false,
                    message: 'User not found or user not login',
                });
            }

            return res.json({
                success: true,
                photos: photo.photos,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}

module.exports = new photoController();
