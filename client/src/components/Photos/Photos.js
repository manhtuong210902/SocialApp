import styles from './Photos.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../redux/apiRequests';

const cx = classNames.bind(styles);

function Photos() {
    const photos = useSelector((state) => state.photo.photos);
    const dispatch = useDispatch();

    useEffect(() => {
        getPhotos(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h5>Photos</h5>
            </div>
            <div className={cx('body')}>
                {photos.length > 0 ? (
                    <Row>
                        {photos.map((photo, index) => {
                            return (
                                <Col xs={4} className={cx('photo-item')} key={index}>
                                    <img className={cx('img-photo-item')} src={photo} alt="" />
                                </Col>
                            );
                        })}
                    </Row>
                ) : (
                    <div className={cx('no-photo')}>
                        <h1>No photos available to show</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Photos;
