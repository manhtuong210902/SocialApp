import { useDispatch, useSelector } from 'react-redux';
import styles from './Avatar.module.scss';
import classNames from 'classnames/bind';
import { CameraFill, Facebook, Github, Instagram, Youtube } from 'react-bootstrap-icons';
import UploadAvatarModal from '../PostModal/UploadAvatarModal';
import { setShowUploadAvatar } from '../../redux/authSlice';

const cx = classNames.bind(styles);

function Avatar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('media')}>
                    <div className={cx('media-image')}>
                        <img src={user.avatar} className={cx('avatar')} alt="Avatar" />
                        <span className={cx('camera-icon')}>
                            <CameraFill
                                onClick={() => {
                                    dispatch(setShowUploadAvatar(true));
                                }}
                            />
                        </span>
                    </div>
                    <div className={cx('media-body')}>
                        <h5 className="mb-2">
                            <strong>{user.username}</strong>
                        </h5>
                        <p className="text-light">
                            {user.email} <span className="badge bg-primary">PRO</span>
                        </p>
                        <ul className={cx('media-social')}>
                            <li>
                                <a href="https://www.facebook.com/" className={cx('bg-fb')}>
                                    <Facebook />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/" className={cx('bg-ins')}>
                                    <Instagram />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/" className={cx('bg-ytb')}>
                                    <Youtube />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/" className={cx('bg-github')}>
                                    <Github />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <UploadAvatarModal />
        </>
    );
}

export default Avatar;
