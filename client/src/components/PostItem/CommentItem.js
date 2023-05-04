import styles from './PostItem.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { ArrowReturnRight, SendFill } from 'react-bootstrap-icons';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import socket from '../../config/socket';

const cx = classNames.bind(styles);

function CommentItem({ comment, className }) {
    const user = useSelector((state) => state.auth.user);
    const [totalReply, setTotalReply] = useState(comment.totalReply);
    const [showReply, setShowReply] = useState(false);
    const [textReply, setTextReply] = useState('');
    const [responses, setResponses] = useState([]);
    const inputRef = useRef();

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/comments/${comment._id}/reply`, {
                text: textReply,
            });

            socket.emit('newReply', { commentId: comment._id, totalReply: totalReply + 1 });
            if (res.data.success) {
                setResponses((prevResponse) => [...prevResponse, res.data.response]);
            }
            //
        } catch (error) {
            console.log(error);
        }

        setShowReply(false);
        setTextReply('');
    };

    const handleShowResponses = async () => {
        try {
            const res = await axios.get(`${API_URL}/comments/${comment._id}/reply`);
            setResponses(res.data.responses);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowReply = () => {
        handleShowResponses();
        setShowReply(true);
    };

    useEffect(() => {
        if (showReply) {
            inputRef.current.focus();
        }
    }, [showReply]);

    useEffect(() => {
        const handleNewReply = ({ commentId, totalReply }) => {
            if (commentId === comment._id) {
                setTotalReply((prev) => prev + 1);
            }
        };

        socket.on('newReply', handleNewReply);

        return () => {
            socket.off('newReply', handleNewReply);
        };
    }, [comment._id]);

    return (
        <div className={cx(`wrapper_comment`, className ? styles.child : '')}>
            <div className={cx('item')}>
                <img src={comment.author.avatar} alt="" />

                <div className={cx('item-text')}>
                    <h5>{comment.author.username}</h5>
                    <p>{comment.text}</p>
                </div>
            </div>
            <div className={cx('actions-comment')}>
                <span>Like</span>
                <span onClick={handleShowReply}>Reply</span>
            </div>

            {totalReply - responses.length > 0 ? (
                <div className={cx('show-more-reply')}>
                    <ArrowReturnRight />
                    <span onClick={handleShowResponses}>{totalReply} Replys</span>
                </div>
            ) : (
                <div className={cx('child-comment')}>
                    {responses.map((repItem) => {
                        return <CommentItem comment={repItem} key={repItem._id} className="child" />;
                    })}
                </div>
            )}

            {showReply && (
                <div className={cx('reply')}>
                    <img src={user.avatar} alt="" />
                    <form className={cx('form-reply')} onSubmit={handleSubmitReply}>
                        <input
                            ref={inputRef}
                            placeholder={`Reply to ${comment.author.username}`}
                            className={cx('reply-input')}
                            type="text"
                            value={textReply}
                            onChange={(e) => setTextReply(e.target.value)}
                        />

                        <button type="submit">
                            <SendFill />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CommentItem;
