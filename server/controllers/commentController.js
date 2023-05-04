const Comment = require('../models/Comment');
const Post = require('../models/Post');

class commentController {
    //@route [POST]: api/comments/add
    //@desc add commnet a post
    //@access private
    async add(req, res, next) {
        const { postId, text } = req.body;
        try {
            const post = await Post.findOne({ _id: postId });
            if (!post) {
                return res.json({
                    success: false,
                    message: 'Post not found',
                });
            }
            const newComment = new Comment({
                postId,
                text,
                author: req.userId,
            });

            const savedComment = await newComment.save();
            const comment = await Comment.findById(savedComment._id).populate('author', ['username', 'avatar']);

            post.lastComment = savedComment._id;
            post.totalComment = post.totalComment + 1;
            await post.save();

            return res.json({
                success: true,
                comment,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [GET]: api/comments/:id
    //@desc get commnet by post
    //@access private
    async getByPostId(req, res, next) {
        const { id } = req.params;
        const { limit = 3, skip = 0 } = req.query; // set default values for limit and skip

        try {
            const comments = await Comment.find({ postId: id })
                .sort({ createdAt: -1 })
                .limit(Number(limit))
                .skip(Number(skip))
                .populate('author');

            return res.json({
                success: true,
                comments,
            });
        } catch (err) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [POST]: api/comments/:commentId/reply
    //@desc response a comment
    //@access private
    async response(req, res, next) {
        const { text } = req.body;
        const parentCommentId = req.params.commentId;
        try {
            const parentComment = await Comment.findById(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({
                    success: false,
                    message: 'Parent comment not found',
                });
            }

            const response = await (
                await Comment.create({ text, author: req.userId, parentComment: parentCommentId })
            ).populate('author');
            parentComment.totalReply += 1;

            parentComment.save();
            return res.json({
                success: true,
                response,
            });
        } catch (err) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [GET]: api/comments/:commentId/reply
    //@desc get all response a comment
    //@access private
    async getResponse(req, res, next) {
        const parentCommentId = req.params.commentId;
        try {
            const responses = await Comment.find({ parentComment: parentCommentId }).populate('author');

            return res.json({
                success: true,
                responses,
            });
        } catch (err) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}

module.exports = new commentController();
