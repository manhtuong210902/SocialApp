import styles from './Contacts.module.scss';
import classNames from 'classnames/bind';
import { Chat } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const cx = classNames.bind(styles);

function Contacts() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get(`${API_URL}/auth/users`);
            setUsers(res.data.users);
        };

        getUsers();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h5>Contacts</h5>
            </div>
            <div className={cx('body')}>
                <div className={cx('list-user')}>
                    {users.map((user) => {
                        return (
                            <div className={cx('user-item')} key={user._id}>
                                <div className={cx('user-info')}>
                                    <img src={user.avatar} alt={user.email} />
                                    <p> {user.username}</p>
                                </div>
                                <div className={cx('actions')}>
                                    <Chat />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Contacts;
