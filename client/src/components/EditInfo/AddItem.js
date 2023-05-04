import styles from './EditInfo.module.scss';
import classNames from 'classnames/bind';
import { PlusCircle } from 'react-bootstrap-icons';

const cx = classNames.bind(styles);

function AddItem({ infoname, onClick }) {
    return (
        <div className={cx('add-info')} onClick={onClick}>
            <PlusCircle /> <span>Add {infoname}</span>
        </div>
    );
}

export default AddItem;
