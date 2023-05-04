const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoUserSchema = new Schema(
    {
        userId: { type: String, require: true },
        birthday: String,
        bio: String,
        gender: String,
        address: String,
        website: [{ name: String, url: String }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('infos', InfoUserSchema);
