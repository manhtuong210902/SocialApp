import styles from './EditInfo.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const cx = classNames.bind(styles);

function EditBirthday({ values, setShow, setInfos }) {
    const [birthday, setBirthday] = useState(values);
    const handleUpdateBirthday = async (e) => {
        e.preventDefault();
        const res = await axios.put(`${API_URL}/infos/me`, { birthday });
        setInfos(res.data.infos);
        setShow(false);
    };

    const handleChangeBirthday = (e) => {
        setBirthday(e.target.value);
    };

    return (
        <form className={cx('form-edit')} onSubmit={handleUpdateBirthday}>
            <label>Birtday: </label>
            <input className="form-control" type="date" value={birthday} onChange={handleChangeBirthday} />
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

export default EditBirthday;
