import styles from './EditInfo.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const cx = classNames.bind(styles);

function EditGender({ values, setShow, setInfos }) {
    const [gender, setGender] = useState(values);
    const handleUpdateGender = async (e) => {
        e.preventDefault();
        const res = await axios.put(`${API_URL}/infos/me`, { gender });
        setInfos(res.data.infos);
        setShow(false);
    };

    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };
    return (
        <form className={cx('form-edit')} onSubmit={handleUpdateGender}>
            <div className={cx('gender-edit')} onChange={handleChangeGender}>
                <label>
                    <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={gender === 'Male'}
                        onChange={handleChangeGender}
                    />
                    Male
                </label>
                <label>
                    <input
                        type="radio"
                        value="Female"
                        name="gender"
                        checked={gender === 'Female'}
                        onChange={handleChangeGender}
                    />
                    Female
                </label>
                <label>
                    <input
                        type="radio"
                        value="Other"
                        name="gender"
                        checked={gender === 'Other'}
                        onChange={handleChangeGender}
                    />
                    Other
                </label>
            </div>
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

export default EditGender;
