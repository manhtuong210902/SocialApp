const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoChema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        photos: [String],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('photos', PhotoChema);
