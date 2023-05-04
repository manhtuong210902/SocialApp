const InfoUser = require('../models/InfoUser');

class infoController {
    //@route [GET]: api/infos/me
    //@desc get full infos by me
    //@access private
    async getInfoByMe(req, res, next) {
        try {
            const infos = await InfoUser.findOne({ userId: req.userId });
            if (!infos) {
                return res.json({
                    success: false,
                    message: 'User not found or user not login',
                });
            }

            return res.json({
                success: true,
                infos,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [PUT]: api/infos/me
    //@desc update info
    //@access private
    async updateInfoByMe(req, res, next) {
        console.log(req.body);
        try {
            const infos = await InfoUser.findOneAndUpdate({ userId: req.userId }, req.body, {
                new: true,
            });
            if (!infos) {
                return res.json({
                    success: false,
                    message: 'User not found or user not login',
                });
            }

            return res.json({
                success: true,
                infos,
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

module.exports = new infoController();
