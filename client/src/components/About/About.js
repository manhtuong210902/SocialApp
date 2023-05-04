import styles from './About.module.scss';
import classNames from 'classnames/bind';
import { Pencil, Trash3 } from 'react-bootstrap-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { API_URL } from '../../utils/constants';
import AddItem from '../EditInfo/AddItem';
import EditBirthday from '../EditInfo/EditBirthday';
import EditBio from '../EditInfo/EditBio';
import EditAddress from '../EditInfo/EditAddress';
import EditGender from '../EditInfo/EditGender';

const cx = classNames.bind(styles);

function About() {
    const user = useSelector((state) => state.auth.user);
    const [showEditBirthDay, setShowEditBirthDay] = useState(false);
    const [showBio, setShowBio] = useState(false);
    const [showAddress, setShowAdress] = useState(false);
    const [showGender, setShowGender] = useState(false);
    const [infos, setInfos] = useState({});

    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get(`${API_URL}/infos/me`);
            setInfos(res.data.infos);
        };
        getInfo();
    }, []);

    const handleShowEditBirday = () => {
        setShowEditBirthDay(true);
    };

    const handleShowEditBio = () => {
        setShowBio(true);
    };

    const handleShowEditAddress = () => {
        setShowAdress(true);
    };

    const handleShowEditGender = () => {
        setShowGender(true);
    };

    const handleDeleteInfo = async (name) => {
        const res = await axios.put(`${API_URL}/infos/me`, { [name]: null });
        setInfos(res.data.infos);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h5>About</h5>
            </div>
            <div className={cx('body')}>
                <div className={cx('info-item')}>
                    {showBio ? (
                        <EditBio values={infos.bio} setShow={setShowBio} setInfos={setInfos} />
                    ) : (
                        <>
                            {infos.bio ? (
                                <div className={cx('detail-bio-item')}>
                                    <span className={cx('bio')}>{infos.bio}</span>
                                    <span className={cx('action-item')}>
                                        <span>
                                            <Trash3
                                                onClick={() => {
                                                    handleDeleteInfo('bio');
                                                }}
                                            />
                                        </span>
                                        <span>
                                            <Pencil onClick={handleShowEditBio} />
                                        </span>
                                    </span>
                                </div>
                            ) : (
                                <AddItem infoname={'bio'} onClick={handleShowEditBio} />
                            )}
                        </>
                    )}
                </div>
                <div className={cx('info-item')}>
                    <div className={cx('detail-info-item')}>
                        <span>
                            <strong>Username: </strong> {user.username}
                        </span>
                    </div>
                </div>
                <div className={cx('info-item')}>
                    <div className={cx('detail-info-item')}>
                        <span>
                            <strong>Email: </strong> {user.email}
                        </span>
                    </div>
                </div>
                <div className={cx('info-item')}>
                    {showEditBirthDay ? (
                        <EditBirthday values={infos.birthday} setShow={setShowEditBirthDay} setInfos={setInfos} />
                    ) : (
                        <>
                            {infos.birthday ? (
                                <div className={cx('detail-info-item')}>
                                    <span>
                                        <strong>Birthday: </strong> {infos.birthday}
                                    </span>
                                    <span className={cx('action-item')}>
                                        <span>
                                            <Trash3
                                                onClick={() => {
                                                    handleDeleteInfo('birthday');
                                                }}
                                            />
                                        </span>
                                        <span>
                                            <Pencil onClick={handleShowEditBirday} />
                                        </span>
                                    </span>
                                </div>
                            ) : (
                                <AddItem infoname={'birthday'} onClick={handleShowEditBirday} />
                            )}
                        </>
                    )}
                </div>
                <div className={cx('info-item')}>
                    {showAddress ? (
                        <EditAddress values={infos.address} setShow={setShowAdress} setInfos={setInfos} />
                    ) : (
                        <>
                            {infos.address ? (
                                <div className={cx('detail-info-item')}>
                                    <span>
                                        <strong>Address: </strong> {infos.address}
                                    </span>
                                    <span className={cx('action-item')}>
                                        <span>
                                            <Trash3
                                                onClick={() => {
                                                    handleDeleteInfo('address');
                                                }}
                                            />
                                        </span>
                                        <span>
                                            <Pencil onClick={handleShowEditAddress} />
                                        </span>
                                    </span>
                                </div>
                            ) : (
                                <AddItem infoname={'current city'} onClick={handleShowEditAddress} />
                            )}
                        </>
                    )}
                </div>
                <div className={cx('info-item')}>
                    {showGender ? (
                        <EditGender values={infos.address} setShow={setShowGender} setInfos={setInfos} />
                    ) : (
                        <>
                            {infos.gender ? (
                                <div className={cx('detail-info-item')}>
                                    <span>
                                        <strong>Gender: </strong> {infos.gender}
                                    </span>
                                    <span className={cx('action-item')}>
                                        <span>
                                            <Trash3
                                                onClick={() => {
                                                    handleDeleteInfo('gender');
                                                }}
                                            />
                                        </span>
                                        <span>
                                            <Pencil onClick={handleShowEditGender} />
                                        </span>
                                    </span>
                                </div>
                            ) : (
                                <AddItem infoname={'gender'} onClick={handleShowEditGender} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default About;
