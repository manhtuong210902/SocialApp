import styles from './Auth.module.scss';
import classNames from 'classnames/bind';
import { Form, InputGroup } from 'react-bootstrap';
import { Key, Person } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { loginUser } from '../../redux/apiRequests';

const cx = classNames.bind(styles);

function LoginForm() {
    const dispatch = useDispatch();
    const schema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Please enter your email'),
        password: yup.string().min(6, 'Must enter at least 6 characters').required('Please enter your password'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            // console.log(values);
            const data = await loginUser(values, dispatch);
            if (!data.success) {
                formik.setErrors({
                    email: data.message,
                    password: data.message,
                });
            }
        },
    });

    return (
        <div className="text-center">
            <div className="mb-4">
                <h2 className={cx('title')}>Sign in</h2>
                <p className={cx('description')}>Sign in to continue to Manhchat</p>
            </div>
            <div className="text-start p-4">
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Text>
                                <Person />
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
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Text>
                                <Key />
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
                    <Form.Group className="mb-4">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <button className={cx('btn-submit')} type="submit">
                        Sign in
                    </button>
                </Form>
            </div>
            <div className="mt-5 text-center">
                <p>
                    Don't have an account ?{' '}
                    <Link to="/register" className={cx('navigate-link')}>
                        Signup now
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
