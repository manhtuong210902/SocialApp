import styles from './PostModal.module.scss';
import classNames from 'classnames/bind';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setShowDeleteModal } from '../../redux/postSlice';
import { deleteMyPost } from '../../redux/apiRequests';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DeletePostModal() {
    const { isShowDeleteModal, post } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        dispatch(setShowDeleteModal(false));
    };

    const handleRemovePost = async () => {
        try {
            setLoading(true);
            await deleteMyPost(post._id, dispatch);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            dispatch(setShowDeleteModal(false));
        }
    };

    return (
        <Modal show={isShowDeleteModal} onHide={handleClose} className={cx('wrapper')}>
            <Modal.Header closeButton className={cx('header')}>
                <Modal.Title>Remove Post</Modal.Title>
            </Modal.Header>
            {loading && (
                <div className={cx('loading')}>
                    <Spinner animation="border" className={cx('spinner')} />
                    <p>Deleting...</p>
                </div>
            )}
            <Modal.Body>
                <p>Are you sure you will delete this post?</p>
            </Modal.Body>
            <Modal.Footer className={cx('footer')}>
                <Button type="submit" className="btn primary" onClick={handleRemovePost}>
                    Remove
                </Button>
                <Button className="btn close" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeletePostModal;
