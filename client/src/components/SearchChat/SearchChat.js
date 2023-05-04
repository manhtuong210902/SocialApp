import { Spinner } from 'react-bootstrap';
import styles from './SearchChat.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchChat({ result, loading }) {
    return (
        <div className={cx('wrapper')}>
            {result.length > 0 ? (
                <>
                    {result.map((user) => {
                        return (
                            <div className={cx('user-item')} key={user._id}>
                                <img src={user.avatar} alt={user._id} className={cx('avatar')} />
                                <p>{user.username}</p>
                            </div>
                        );
                    })}
                </>
            ) : (
                <div className={cx('loading')}>
                    <p>User not found</p>
                </div>
            )}
            {loading && (
                <div className={cx('loading')}>
                    <Spinner animation="border" className={cx('spinner')} />
                    <p>Searching...</p>
                </div>
            )}
        </div>
    );
}

export default SearchChat;
