const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostChema = new Schema(
    {
        title: { type: String, required: true },
        content: String,
        author: { type: Schema.Types.ObjectId, ref: 'users' },
        date: { type: Date, default: Date.now },
        likes: [String],
        image: String,
        filename: String,
        lastComment: { type: Schema.Types.ObjectId, ref: 'comments' },
        totalComment: { type: Number, default: 0 },
        //tags: [String],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('posts', PostChema);
