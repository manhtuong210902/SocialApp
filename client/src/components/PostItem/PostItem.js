import { useState } from 'react';
import { Card, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChatLeft, HandThumbsUp, HandThumbsUpFill, Pencil, SendFill, Trash3 } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentPost, likePost } from '../../redux/apiRequests';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

import styles from './PostItem.module.scss';
import classNames from 'classnames/bind';
import { findPost, setShowDeleteModal, setShowEditModal } from '../../redux/postSlice';
import socket from '../../config/socket';
import Comments from './Comments';

const cx = classNames.bind(styles);

function PostItem({ data }) {
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    dayjs.extend(relativeTime);
    dayjs.locale('en'); // set the locale

    const handleShowDeleteModal = () => {
        dispatch(setShowDeleteModal(true));
        dispatch(findPost(data));
    };

    const handleShow = () => {
        dispatch(setShowEditModal(true));
        dispatch(findPost(data));
    };

    const handleLikePost = () => {
        likePost(data._id, user._id, dispatch);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        console.log(comment);
        const newComment = await addCommentPost(data._id, comment);
        socket.emit('newComment', { postId: data._id, comment: newComment });
        setComment('');
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('media')}>
                        <Image src={data.author.avatar} alt="" className={cx('avatar')} />
                        <div className={cx('media-info')}>
                            <p>{data.author.username}</p>
                            <span>{dayjs(data.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    {user.username === data.author.username ? (
                        <div className={cx('options')}>
                            <span onClick={handleShowDeleteModal}>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove</Tooltip>}>
                                    <Trash3 />
                                </OverlayTrigger>
                            </span>

                            <span onClick={handleShow}>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                    <Pencil />
                                </OverlayTrigger>
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={cx('body')}>
                    <Card.Title className={cx('title')}>## {data.title}</Card.Title>
                    <p>{data.content}</p>
                    {data.image ? <Card.Img src={data.image} alt="" className={cx('img')} /> : <></>}
                    <div className={cx('actions')}>
                        <div
                            onClick={handleLikePost}
                            className={cx('btn-like')}
                            style={{
                                color: `${data.likes.includes(user._id) ? '#396eb0' : '#333'}`,
                            }}
                        >
                            {data.likes.length > 0 && data.likes.length}
                            {data.likes.includes(user._id) ? (
                                <HandThumbsUpFill className={cx('icon-like')} />
                            ) : (
                                <HandThumbsUp className={cx('icon-like')} />
                            )}
                            Like
                        </div>
                        <div className={cx('btn-like')}>
                            {data.totalComment > 0 && data.totalComment}
                            <ChatLeft className={cx('icon-like')} />
                            Comment
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('comment')}>
                        <img src={user.avatar} alt="" />
                        <form className={cx('form-comment')} onSubmit={handleAddComment}>
                            <input
                                type="text"
                                name="text"
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button type="submit">
                                <SendFill />
                            </button>
                        </form>
                    </div>
                </div>
                <div className={cx('comments')}>
                    <Comments postId={data._id} totalComment={data.totalComment} />
                </div>
            </div>
        </>
    );
}

export default PostItem;
