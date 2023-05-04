import styles from './PostItem.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import socket from '../../config/socket';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles);

function Comments({ postId, totalComment }) {
    const [comments, setComments] = useState([]);
    const [commentSockets, setCommentSockets] = useState([]);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        const handleNewComment = ({ postId: commentPostId, comment }) => {
            if (postId === commentPostId) {
                setCommentSockets((prevComments) => [...prevComments, comment]);
            }
        };

        socket.on('newComment', handleNewComment);

        return () => {
            socket.off('newComment', handleNewComment);
        };
    }, [postId]);

    async function fetchComments() {
        try {
            const res = await axios.get(`${API_URL}/comments/${postId}?limit=${3}&skip=${skip}`);
            const data = res.data.comments;
            const newComments = data.filter((comment) => {
                return !commentSockets.some((commentSocket) => commentSocket._id === comment._id);
            });
            setComments((prevComments) => [...prevComments, ...newComments]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSeeMore = () => {
        setSkip((prevSkip) => prevSkip + 3);
        fetchComments();
    };

    return (
        <>
            {commentSockets.length > 0 &&
                commentSockets.map((comment, index) => {
                    return <CommentItem comment={comment} key={index} />;
                })}

            {comments.length > 0 &&
                comments.map((comment, index) => {
                    return <CommentItem comment={comment} key={index} />;
                })}

            {totalComment - comments.length > 0 && (
                <button className="btn link" onClick={handleSeeMore}>
                    Views more comments
                </button>
            )}
        </>
    );
}

export default Comments;
