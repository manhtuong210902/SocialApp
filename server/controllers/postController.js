const Post = require('../models/Post');
const User = require('../models/User');
const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');

class postController {
    //@route [GET]: api/posts
    //@desc get full post
    //@access public
    async getFull(req, res, next) {
        try {
            const posts = await Post.find({})
                .populate('author', ['username', 'avatar'])
                .populate({
                    path: 'lastComment',
                    populate: {
                        path: 'author',
                        select: ['username', 'avatar'],
                    },
                })
                .sort({ createdAt: -1 });

            return res.json({
                success: true,
                posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [GET]: api/posts/me
    //@desc get a post by user login
    //@access public
    async getByUser(req, res, next) {
        try {
            const posts = await Post.find({ author: req.userId })
                .populate('author', ['username', 'avatar'])
                .populate({
                    path: 'lastComment',
                    populate: {
                        path: 'author',
                        select: ['username', 'avatar'],
                    },
                })
                .sort({ createdAt: -1 });

            return res.json({
                success: true,
                posts,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [GET]: api/posts/:id
    //@desc get a post by id
    //@access private

    //sau chỉnh lại chỗ này
    async getById(req, res, next) {
        const postId = req.params.id;
        try {
            const post = await Post.findOne({ _id: postId });
            if (!post) {
                return res.json({
                    success: false,
                    message: 'Post not found',
                });
            }
            return res.json({
                success: true,
                post,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [POST] :/api/posts/add
    //@desc: create a post
    //@access private
    async add(req, res, next) {
        const { title, content } = req.body;
        try {
            let image = null;
            let filename = null;
            if (req.file) {
                image = req.file.path;
                filename = req.file.filename;
                const photoUser = await Photo.findOne({ userId: req.userId });
                photoUser.photos.unshift(image);
                await photoUser.save();
            }

            const newPost = new Post({
                title,
                content,
                author: req.userId,
                image,
                filename,
            });

            await newPost.save();

            const post = await newPost.populate('author');

            return res.json({ success: true, message: 'create post successfully', post });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [DELETE] :/api/posts/:id
    //@desc: delete a post
    //@access private
    async delete(req, res, next) {
        try {
            const deletePost = await Post.findById(req.params.id);

            if (!deletePost) {
                return res.json({
                    success: false,
                    message: 'Post not found or user not login',
                });
            }

            if (deletePost.filename) {
                await cloudinary.v2.uploader.destroy(deletePost.filename);
                const photoUser = await Photo.findOne({ userId: req.userId });
                photoUser.photos = photoUser.photos.filter((url) => url !== deletePost.image);
                await photoUser.save();
            }

            await deletePost.delete();
            return res.json({
                success: true,
                message: 'Delete successfully',
                deletePost,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [PUT] :api/posts/:id
    //@desc: update a post
    //@access private
    async update(req, res, next) {
        const { title, content, isChangeImage } = req.body;
        const postId = req.params.id;

        const image = req.file ? req.file.path : null;
        const filename = req.file ? req.file.filename : null;
        try {
            const updatePost = await Post.findById(postId).populate('author');

            if (!updatePost) {
                return res.json({
                    success: false,
                    message: 'Post not found or user not login',
                });
            }

            console.log(isChangeImage);
            if (isChangeImage === 'true') {
                const photoUser = await Photo.findOne({ userId: req.userId });
                if (updatePost.filename) {
                    await cloudinary.v2.uploader.destroy(updatePost.filename);
                    photoUser.photos = photoUser.photos.filter((url) => url !== updatePost.image);
                }
                updatePost.filename = filename;
                updatePost.image = image;
                photoUser.photos.unshift(updatePost.image);
                await photoUser.save();
            }

            updatePost.title = title;
            updatePost.content = content;

            await updatePost.save();

            return res.json({
                success: true,
                updatePost: updatePost,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //@route [PUT] :api/posts/:id/like
    //@desc: like a post
    //@access public
    async updateLike(req, res, next) {
        const postId = req.params.id;
        const { userId } = req.body;

        try {
            const post = await Post.findById(postId);
            console.log(post);
            if (!post) {
                //throw new Error('Post not found');
                return res.json({
                    success: false,
                    message: 'Post not found',
                });
            }
            if (post.likes.includes(userId)) {
                //throw new Error('Post already liked by user');
                post.likes = post.likes.filter((like) => like !== userId);
                await post.save();
                return res.json({
                    success: false,
                    type: 'liked',
                    message: 'Post already liked by user',
                });
            }
            post.likes.push(userId);
            const updatedPost = await post.save();
            return res.json({
                success: true,
                updatedPost,
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

module.exports = new postController();
