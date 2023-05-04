import { Col, Container, Row } from 'react-bootstrap';
import { ChatDotsFill } from 'react-bootstrap-icons';

import styles from './AuthLayout.module.scss';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Preloader from '../../components/Preloader';
import { Navigate } from 'react-router-dom';
import config from '../../config';

const cx = classnames.bind(styles);

function AuthLayout({ children }) {
    const authLoading = useSelector((state) => state.auth.authLoading);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    //
    if (authLoading) {
        return <Preloader />;
    }

    if (isAuthenticated) {
        return <Navigate to={config.routes.home} />;
    }

    return (
        <div className="my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <div className="text-center mb-5 d-flex align-items-center justify-content-center">
                            <ChatDotsFill color="#3d8361" fontSize={'28px'} />
                            <h1 className={cx('title')}>Manhchat</h1>
                        </div>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AuthLayout;
