import classNames from 'classnames/bind';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

function MessageRight() {
    return (
        <div className={cx('left')}>
            <p>hello, chào cậu skjfklsf jlkasjfljsklfj kljajsf ksjfkls </p>
        </div>
    );
}

export default MessageRight;
