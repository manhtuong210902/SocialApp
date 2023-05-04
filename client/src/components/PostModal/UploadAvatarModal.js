import styles from './PostModal.module.scss';
import classNames from 'classnames/bind';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addMyPost, getPhotos, updateAvatar } from '../../redux/apiRequests';
import { useEffect, useState } from 'react';
import { setShowUploadAvatar } from '../../redux/authSlice';

const cx = classNames.bind(styles);

function UploadAvatarModal() {
    const photos = useSelector((state) => state.photo.photos);
    const isShowUploadAvatar = useSelector((state) => state.auth.isShowUploadAvatar);
    const dispatch = useDispatch();

    useEffect(() => {
        getPhotos(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [content, setContent] = useState('');

    const fetchImage = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        setImageFile(file);
        setImageSrc(url);
    };

    const handleChangFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        } else {
            setImageFile(null);
        }
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageSrc(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const post = {
                title: 'upload profile picture',
                content: content,
                image: imageFile,
            };
            const postAdd = await addMyPost(post, dispatch);
            if (postAdd) {
                await updateAvatar(postAdd.image, dispatch);
            }
            setContent('');
            setImageFile(null);
            setImageSrc(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            dispatch(setShowUploadAvatar(false));
        }
    };

    const handleClose = () => {
        dispatch(setShowUploadAvatar(false));
        setContent('');
        setImageFile(null);
        setImageSrc(null);
    };

    return (
        <Modal show={isShowUploadAvatar} onHide={handleClose} className={cx('wrapper')}>
            <Modal.Header closeButton className={cx('header')}>
                <Modal.Title>Upload profile picture</Modal.Title>
            </Modal.Header>
            {loading && (
                <div className={cx('loading')}>
                    <Spinner animation="border" className={cx('spinner')} />
                    <p>Uploading...</p>
                </div>
            )}
            <Modal.Body>
                {imageSrc ? (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                type="text"
                                value={content}
                                className={cx('form-input')}
                                placeholder="Description"
                                autoFocus
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div className={cx('avatar-container')}>
                                <div className={cx('circle')}></div>
                                <img src={imageSrc} alt="Preview" />
                            </div>
                        </Form.Group>
                    </Form>
                ) : (
                    <>
                        <Form noValidate id="upload-form" encType="multipart/form-data" className={cx('form')}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    className="d-none"
                                    id="upload-avatar"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChangFile}
                                />
                                <Form.Label htmlFor="upload-avatar" className={cx('label-upload-avatar')}>
                                    <Plus /> <span>Upload photo</span>
                                </Form.Label>
                            </Form.Group>
                        </Form>
                        <div className={'suggest-photo'}>
                            <p>Suggested Photos</p>
                            <div>
                                {photos.length > 0 ? (
                                    <Row>
                                        {photos.map((photo, index) => {
                                            return (
                                                <Col
                                                    xs={3}
                                                    className={cx('photo-item')}
                                                    key={index}
                                                    onClick={() => fetchImage(photo)}
                                                >
                                                    <img className={cx('img-photo-item')} src={photo} alt="" />
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                ) : (
                                    <div className={cx('no-photo')}>
                                        <h1>No photos available to show</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Modal.Body>
            {imageSrc && (
                <Modal.Footer className={cx('footer-avatar')}>
                    <Button form="update-form" type="submit" className={cx('btn-submit')} onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button form="update-form" type="submit" className="btn close" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default UploadAvatarModal;
