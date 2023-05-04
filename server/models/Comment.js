const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        postId: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'users' },
        date: { type: Date, default: Date.now },
        likes: [String],
        text: { type: String },
        totalReply: { type: Number, default: 0 },
        parentComment: { type: Schema.Types.ObjectId, ref: 'comments' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('comments', CommentSchema);
