const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        name: String,
        users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
        messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
        lastMessages: String,
        lastTime: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('chats', ChatSchema);
