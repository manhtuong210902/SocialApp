import styles from './Header.module.scss';
import classnames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { logoutUser } from '../../redux/apiRequests';
import { Link } from 'react-router-dom';
import config from '../../config';
import { BoxArrowInRight, ChatLeftText } from 'react-bootstrap-icons';
import Chats from '../Chats/Chats';
import { useState } from 'react';

const cx = classnames.bind(styles);

function Header() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('brand')}>
                    <Link to={config.routes.home}>
                        <h1 className={cx('logo')}>Soci</h1>
                    </Link>
                </div>
                <div className={cx('options')}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Chats</Tooltip>}>
                        <span
                            className={cx('option-item', `${showChat ? 'active' : ''}`)}
                            onClick={() => {
                                setShowChat((prev) => !prev);
                            }}
                        >
                            <ChatLeftText />
                        </span>
                    </OverlayTrigger>
                    <Link to={config.routes.profile}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>profile</Tooltip>}>
                            <img src={user.avatar} alt={user.username} className={cx('avatar')} />
                        </OverlayTrigger>
                    </Link>

                    <Button className={cx('btn-logout')} onClick={() => logoutUser(dispatch)}>
                        <BoxArrowInRight className="me-2" />
                        Logout
                    </Button>
                </div>
            </div>
            <div>{showChat && user && <Chats setShowChat={setShowChat} />}</div>
        </>
    );
}

export default Header;
