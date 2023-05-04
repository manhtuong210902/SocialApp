import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import styles from './PostModal.module.scss';
import classnames from 'classnames/bind';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateMyPost } from '../../redux/apiRequests';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Image as ImageIcon, XCircleFill } from 'react-bootstrap-icons';
import { setShowEditModal } from '../../redux/postSlice';

const cx = classnames.bind(styles);

function UpdatePostModal() {
    const dispatch = useDispatch();
    const { isShowEditModal, post } = useSelector((state) => state.post);

    const [loading, setLoading] = useState(false);

    const [updatedPost, setUpdatedPost] = useState(post);

    const [imageSrc, setImageSrc] = useState(null);

    const schema = yup.object().shape({
        title: yup.string().required('Please enter title'),
        content: yup.string().required('Please enter content'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            image: null,
            isChangeImage: false,
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await updateMyPost(updatedPost._id, values, dispatch);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
                dispatch(setShowEditModal(false));
                setImageSrc(null);
                formik.resetForm();
            }
        },
    });

    useEffect(() => {
        if (!post) {
            setUpdatedPost({ title: '', content: '' });
        } else {
            formik.setFieldValue('title', post.title);
            formik.setFieldValue('content', post.content);
            formik.setFieldValue('image', post.image);
            if (!post.image) {
                setImageSrc(null);
            } else {
                setImageSrc(post.image);
            }
            setUpdatedPost(post);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post]);

    const handleClose = () => {
        dispatch(setShowEditModal(false));
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        formik.setFieldValue('image', file);
        formik.setFieldValue('isChangeImage', true);
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageSrc(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleDropFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        formik.setFieldValue('image', file);
        formik.setFieldValue('isChangeImage', true);
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageSrc(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleChangeImage = () => {
        setImageSrc(null);
        formik.setFieldValue('isChangeImage', true);
        formik.setFieldValue('image', null);
    };

    return (
        <Modal show={isShowEditModal} onHide={handleClose} className={cx('wrapper')}>
            <Modal.Header closeButton className={cx('header')}>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            {loading && (
                <div className={cx('loading')}>
                    <Spinner animation="border" className={cx('spinner')} />
                    <p>Updating...</p>
                </div>
            )}
            <Modal.Body>
                <Form
                    noValidate
                    id="update-form"
                    encType="multipart/form-data"
                    onSubmit={formik.handleSubmit}
                    className={cx('form')}
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            className={cx('form-input')}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeholder="Ex: Dog and cat"
                            name="title"
                            isInvalid={formik.errors.title && formik.touched.title}
                            onInput={() => {
                                formik.setFieldTouched('title', false, false);
                            }}
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            className={cx('form-input')}
                            as="textarea"
                            name="content"
                            rows={3}
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onInput={() => {
                                formik.setFieldTouched('content', false, false);
                            }}
                            isInvalid={formik.errors.content && formik.touched.content}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.content}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        {imageSrc ? (
                            <div className={cx('add-image')}>
                                <img src={imageSrc} alt="Preview" />
                                <div className={cx('btn-delete-image')} onClick={handleChangeImage}>
                                    <XCircleFill />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Form.Label
                                    htmlFor="update-image"
                                    className={cx('label-image')}
                                    onDrop={handleDropFile}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <span>
                                        <ImageIcon />
                                    </span>
                                    <div>
                                        <h5>Add Photo</h5>
                                        <p>or drag and drop</p>
                                    </div>
                                </Form.Label>
                            </>
                        )}

                        <Form.Control
                            className="d-none"
                            id="update-image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChangeFile}
                            onClick={(e) => {
                                e.target.value = null;
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={cx('footer')}>
                <Button form="update-form" type="submit" className={cx('btn-submit')}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdatePostModal;
