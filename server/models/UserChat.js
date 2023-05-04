const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserChatSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        chats: [
            {
                type: Schema.Types.ObjectId,
                ref: 'chats',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('userChats', UserChatSchema);
