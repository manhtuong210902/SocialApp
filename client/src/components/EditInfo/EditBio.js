import styles from './EditInfo.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const cx = classNames.bind(styles);

function EditBio({ values, setShow, setInfos }) {
    const [bio, setBio] = useState(values);
    const handleUpdateBio = async (e) => {
        e.preventDefault();
        const res = await axios.put(`${API_URL}/infos/me`, { bio });
        setInfos(res.data.infos);
        setShow(false);
    };

    const handleChangeBio = (e) => {
        setBio(e.target.value);
    };
    return (
        <form className={cx('form-edit')} onSubmit={handleUpdateBio}>
            <textarea type="text" placeholder="Describe who you are" rows={3} value={bio} onChange={handleChangeBio} />
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

export default EditBio;
