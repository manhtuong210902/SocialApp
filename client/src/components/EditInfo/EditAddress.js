import styles from './EditInfo.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const cx = classNames.bind(styles);

function EditAddress({ values, setShow, setInfos }) {
    const [address, setAddress] = useState(values);
    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        const res = await axios.put(`${API_URL}/infos/me`, { address });
        setInfos(res.data.infos);
        setShow(false);
    };

    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    return (
        <form className={cx('form-edit')} onSubmit={handleUpdateAddress}>
            <label>Address: </label>
            <textarea type="text" placeholder="Enter address" rows={3} value={address} onChange={handleChangeAddress} />
            <div className={cx('form-edit-btns')}>
                <Button className="btn primary" type="submit">
                    Save
                </Button>
                <Button
                    className="btn close"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Close
                </Button>
            </div>
        </form>
    );
}

export default EditAddress;
