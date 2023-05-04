import styles from './Banner.module.scss';
import classNames from 'classnames/bind';
import { Megaphone } from 'react-bootstrap-icons';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('media')}>
                <div className={cx('item-icon')}>
                    <Megaphone className={cx('icon')} />
                </div>
                <div className={cx('media-body')}>
                    <h3 className={cx('item-title')}>Members Newsfeed</h3>
                    <p>Check what your friends have been up to!</p>
                </div>
            </div>
            <ul>
                <li className={cx('shape-banner')}>
                    <img src={images.shapeBanner} alt="" />
                </li>

                <li className={cx('newFeed-banner')}>
                    <img src={images.newFeed} alt="" />
                </li>
            </ul>
        </div>
    );
}

export default Banner;
