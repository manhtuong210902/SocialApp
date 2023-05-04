import classNames from 'classnames/bind';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

function MessageLeft() {
    return (
        <div className={cx('right')}>
            <p>hello, chào cậu sldfjskld sdfjsjd sdkfjsdjf sdfjksd</p>
        </div>
    );
}

export default MessageLeft;
