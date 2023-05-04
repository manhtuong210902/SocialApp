const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        text: String,
        // chat: { type: Schema.Types.ObjectId, ref: 'chats' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('messages', MessageSchema);
