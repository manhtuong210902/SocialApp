import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import styles from './MainLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <Container className={cx('content')}>{children}</Container>
        </div>
    );
}

export default MainLayout;
