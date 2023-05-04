const User = require('../models/User');

class searchController {
    //@route [GET]: api/search?q
    //@desc search user by name and email
    //@access private
    async searchUser(req, res, next) {
        try {
            const { q } = req.query;
            console.log(q);
            const regex = new RegExp(q, 'i'); // create a regular expression that matches the search query, case-insensitive
            const users = await User.find({ $or: [{ username: regex }, { email: regex }], _id: { $ne: req.userId } }); // find all users whose name or email matches the search query

            return res.json({
                success: true,
                users,
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

module.exports = new searchController();
