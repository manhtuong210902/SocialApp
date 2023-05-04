import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import styles from './PostModal.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addMyPost } from '../../redux/apiRequests';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Image as ImageIcon, XCircleFill } from 'react-bootstrap-icons';
import { setShowAddModal } from '../../redux/postSlice';
import { addPhoto } from '../../redux/photoSlice';

const cx = classNames.bind(styles);

function AddPostModal() {
    const dispatch = useDispatch();
    const isShowAddModal = useSelector((state) => state.post.isShowAddModal);
    const handleClose = () => {
        dispatch(setShowAddModal(false));
        setImageSrc(null);
        formik.resetForm();
    };

    const [loading, setLoading] = useState(false);
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
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const post = await addMyPost(values, dispatch);
                if (post.image) {
                    dispatch(addPhoto(post.image));
                }
                formik.resetForm();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
                dispatch(setShowAddModal(false));
                setImageSrc(null);
            }
        },
    });

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        formik.setFieldValue('image', file);
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
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageSrc(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleChangeImage = () => {
        setImageSrc(null);
        formik.setFieldValue('image', null);
    };
    return (
        <Modal show={isShowAddModal} onHide={handleClose} className={cx('wrapper')}>
            <Modal.Header closeButton className={cx('header')}>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            {loading && (
                <div className={cx('loading')}>
                    <Spinner animation="border" className={cx('spinner')} />
                    <p>Postting...</p>
                </div>
            )}
            <Modal.Body>
                <Form
                    id="add-form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                    className={cx('form')}
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            className={cx('form-input')}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeholder="##Enter title ..."
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
                            placeholder="What's on your mind ?"
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
                                    htmlFor="image"
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
                            id="image"
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
                <Button form="add-form" type="submit" className={cx('btn-submit')}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddPostModal;
