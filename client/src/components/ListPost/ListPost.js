import { useEffect } from 'react';
import PostItem from '../PostItem';
import Preloader from '../Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getFullPosts, getMyPosts } from '../../redux/apiRequests';
import styles from './ListPost.module.scss';
import classNames from 'classnames/bind';
import AddPostModal from '../PostModal/AddPostModal';
import UpdatePostModal from '../PostModal/UpdatePostModal';
import DeletePostModal from '../PostModal/DeletePostModal';
import { Button } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import { setShowAddModal } from '../../redux/postSlice';

const cx = classNames.bind(styles);

function ListPost({ isHome }) {
    const posts = useSelector((state) => state.post.posts);
    const postLoading = useSelector((state) => state.post.postLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('render -home');
        if (isHome) {
            getFullPosts(dispatch);
        } else {
            getMyPosts(dispatch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHome]);

    const handleShowAdd = () => {
        dispatch(setShowAddModal(true));
    };

    if (postLoading) {
        console.log('loading');
        return <Preloader />;
    }

    return (
        <>
            <div>
                <div className={cx('header')}>
                    <h5>{isHome ? 'Posts' : 'My Posts'}</h5>
                    <Button onClick={handleShowAdd} className={cx('btn-add')}>
                        <PlusCircle /> Create post
                    </Button>
                </div>
                <div>
                    {posts.length !== 0 ? (
                        <>
                            {posts.map((post) => {
                                return <PostItem key={post._id} data={post} />;
                            })}
                        </>
                    ) : (
                        <>
                            <div className={cx('no-post')}>
                                <h1>No posts available</h1>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <AddPostModal />
            {posts !== null && <UpdatePostModal />}
            {posts !== null && <DeletePostModal />}
        </>
    );
}

export default ListPost;
