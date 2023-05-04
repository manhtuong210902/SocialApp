import { Col, Container, Row } from 'react-bootstrap';
import styles from './Chats.module.scss';
import classNames from 'classnames/bind';
import { ChatLeftText, Search, XLg } from 'react-bootstrap-icons';
import ChatItem from '../ChatItem/ChatItem';
import ChatFrame from '../ChatFrame/ChatFrame';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import SearchChat from '../SearchChat/SearchChat';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const cx = classNames.bind(styles);

function Chats({ setShowChat }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currentChat, setCurrentChat] = useState('');

    const inputRef = useRef();

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(`${API_URL}/search?q=${debounceValue}`);
            setLoading(false);
            setSearchResult(result.data.users);
        };
        fetchApi();
    }, [debounceValue]);

    // const handleClear = () => {
    //     inputRef.current.focus();
    //     setSearchValue('');
    //     setSearchResult([]);
    // };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (searchValue.startsWith(' ')) {
            return;
        }
        setSearchValue(searchValue);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div>
                    <span>
                        <ChatLeftText />
                    </span>
                    <h1 className={cx('title')}>Chats</h1>
                </div>
                <span onClick={() => setShowChat(false)}>
                    <XLg />
                </span>
            </div>
            <div className={cx('content')}>
                <Container className="h-100">
                    <Row className="h-100">
                        <Col xs={5} className={cx('list-user')}>
                            <div className={cx('header-list')}>
                                <input
                                    placeholder="Search users..."
                                    ref={inputRef}
                                    value={searchValue}
                                    onChange={handleChange}
                                    onFocus={() => setShowResult(true)}
                                />
                                <span>
                                    <Search />
                                </span>
                            </div>
                            {showResult && searchValue.trim().length > 0 ? (
                                <SearchChat loading={loading} result={searchResult} />
                            ) : (
                                <>
                                    <ChatItem />
                                    <ChatItem />
                                </>
                            )}
                        </Col>
                        <Col xs={7} className={cx('chat-frame')}>
                            <ChatFrame otherUserId={currentChat} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Chats;
