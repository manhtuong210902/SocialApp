import styles from './ChatItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ChatItem() {
    return (
        <div className={cx('wrapper', 'active')}>
            <div className={cx('content')}>
                <img
                    src="https://res.cloudinary.com/djewqtdwn/image/upload/v1678379692/social-app/oszkptuwqbuvxiqbf14t.png"
                    alt=""
                    className={cx('avatar')}
                />
                <div className={cx('info')}>
                    <h3 className={cx('name')}>Manh Tuong</h3>
                    <p className={cx('last-message')}>hello, chào cậu minfg là nguyễn mạnh tường</p>
                </div>
            </div>
            <span>17:06</span>
        </div>
    );
}

export default ChatItem;
