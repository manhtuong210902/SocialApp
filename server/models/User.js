const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserChema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, uniquie: true },
        password: { type: String, required: true },
        avatar: { type: String, default: 'http://localhost:5001/uploads/avatarDefault.png' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('users', UserChema);
