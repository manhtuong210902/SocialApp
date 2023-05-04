import classNames from 'classnames/bind';
import styles from './ChatFrame.module.scss';
import MessageLeft from '../Message/MessageLeft';
import MessageRight from '../Message/MessageRight';
import { Send } from 'react-bootstrap-icons';

const cx = classNames.bind(styles);

function ChatFrame({ otherUserId }) {
    return (
        <>
            {!otherUserId ? (
                <div className={cx('no-chat')}>
                    <p>Hello!</p>
                </div>
            ) : (
                <>
                    <div className={cx('header')}>
                        <h3>Manh Tuong</h3>
                    </div>
                    <div className={cx('list-message')}>
                        <MessageLeft />
                        <MessageRight />
                        <MessageLeft />
                        <MessageRight />
                        <MessageLeft />
                        <MessageRight />
                        <MessageLeft />
                        <MessageRight />
                        <MessageLeft />
                        <MessageRight />
                    </div>
                    <div className={cx('input-chat')}>
                        <form>
                            <input placeholder="Enter Message..."></input>
                            <span>
                                <Send />
                            </span>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}

export default ChatFrame;
