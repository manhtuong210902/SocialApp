const Chat = require('../models/Chat');
const Message = require('../models/Message');

class chatController {
    //@route [POST]: api/chats/message
    //@desc chat peture
    //@access private
    async texting(req, res, next) {
        const { idOtherUser, text } = req.body;
        try {
            const message = await new Message({
                sender: req.userId,
                text,
            });
            let chatRoom = await Chat.findOne({
                users: {
                    $all: [req.userId, idOtherUser],
                },
            });

            if (!chatRoom) {
                chatRoom = await new Chat({
                    name: `${req.userId}-${idOtherUser}`,
                    users: [req.userId, idOtherUser],
                });
            }

            chatRoom.lastMessages = message.text;
            chatRoom.lastTime = message.createdAt;
            chatRoom.messages.push(message._id);
            chatRoom.save();

            return res.json({
                success: true,
                message,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [POST]: api/chats/me
    //@desc get chats form a user
    //@access private
    async getUserChats(req, res, next) {
        try {
            const userChats = await Chat.find({
                users: {
                    $all: [req.userId, idOtherUser],
                },
            }).sort({ lastTime: -1 });

            return res.json({
                success: true,
                chats: userChats,
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

module.exports = new chatController();
