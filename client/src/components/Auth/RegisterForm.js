import styles from './Auth.module.scss';
import classNames from 'classnames/bind';
import { Form, InputGroup } from 'react-bootstrap';
import { Envelope, Lock, Person } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { registerUser } from '../../redux/apiRequests';
import config from '../../config';

const cx = classNames.bind(styles);

function RegisterForm() {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Please enter your email'),
        username: yup.string().min(6, 'Must enter at least 6 characters').required('Please enter your username'),
        password: yup.string().min(6, 'Must enter at least 6 characters').required('Please enter your password'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            const data = await registerUser(values);
            if (!data.success) {
                formik.setErrors({
                    email: data.message,
                    username: data.message,
                    password: data.message,
                });
            } else {
                navigate(config.routes.login);
            }
        },
    });

    return (
        <div className="text-center">
            <div className="mb-4">
                <h2 className={cx('title')}>Sign up</h2>
                <p className={cx('description')}>Get your ManhChat account now</p>
            </div>
            <div className="text-start p-4">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Text>
                                <Envelope />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Enter email"
                                name="email"
                                type="text"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={() => {
                                    formik.setFieldTouched('email', false, false);
                                }}
                                isInvalid={formik.errors.email && formik.touched.email}
                                className={cx('form-input')}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Text>
                                <Person />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Enter username"
                                name="username"
                                type="text"
                                value={formik.values.username}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={() => {
                                    formik.setFieldTouched('username', false, false);
                                }}
                                isInvalid={formik.errors.username && formik.touched.username}
                                className={cx('form-input')}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Text>
                                <Lock />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Enter password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={() => {
                                    formik.setFieldTouched('password', false, false);
                                }}
                                isInvalid={formik.errors.password && formik.touched.password}
                                className={cx('form-input')}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <button className={cx('btn-submit')} type="submit">
                        Sign up
                    </button>
                </Form>
            </div>
            <div className="mt-5 text-center">
                <p>
                    Already have an account ?{' '}
                    <Link to="/login" className={cx('navigate-link')}>
                        Signin
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
