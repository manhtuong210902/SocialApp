import axios from 'axios';
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from '../utils/constants';
import setAuthToken from '../utils/setAuthToken';
import { loadUserFail, loadUserSuccess, uploadAvatar } from './authSlice';
import { loadPhotoFail, loadPhotoSuccess } from './photoSlice';

import { loadPostFail, loadPostSuccess, addPost, deletePost, updatePost, likePostUp, likePostDown } from './postSlice';

//loader user
export const loaderUser = async (dispatch) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
        const res = await axios.get(`${API_URL}/auth`);
        if (res.data.success) {
            dispatch(loadUserSuccess(res.data.user));
        }
    } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        dispatch(loadUserFail());
    }
};

//login user
export const loginUser = async (userData, dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, userData);
        if (res.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        }

        //
        await loaderUser(dispatch);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

//register user
export const registerUser = async (userData) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, userData);
        if (res.data.success) {
            return res.data;
        }
    } catch (error) {
        return error.response.data;
    }
};

//logout user
export const logoutUser = (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    setAuthToken(null);
    dispatch(loadUserFail());
};

//update avatar user
export const updateAvatar = async (avatar, dispatch) => {
    try {
        const res = await axios.put(`${API_URL}/auth/upload`, { avatar: avatar });
        if (res.data.success) {
            dispatch(uploadAvatar(avatar));
        }
    } catch (error) {
        return error.response.data;
    }
};

//get full post
export const getFullPosts = async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/posts`);
        if (res.data.success) {
            dispatch(loadPostSuccess(res.data.posts));
        }
    } catch (error) {
        console.log(error);
        dispatch(loadPostFail());
    }
};

//get my post
export const getMyPosts = async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/posts/me`);
        if (res.data.success) {
            dispatch(loadPostSuccess(res.data.posts));
        }
    } catch (error) {
        dispatch(loadPostFail());
    }
};

//add my post
export const addMyPost = async (post, dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/posts/add`, post, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (res.data.success) {
            dispatch(addPost(res.data.post));
            return res.data.post;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

//delete my post
export const deleteMyPost = async (idPost, dispatch) => {
    try {
        const res = await axios.delete(`${API_URL}/posts/${idPost}`);
        if (res.data.success) {
            dispatch(deletePost(idPost));
        }
    } catch (error) {
        console.log(error);
    }
};

//update my post
export const updateMyPost = async (postId, post, dispatch) => {
    try {
        const res = await axios.put(`${API_URL}/posts/${postId}`, post, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res.data.success) {
            dispatch(updatePost(res.data.updatePost));
        }
    } catch (error) {
        console.log(error);
    }
};

//like post
export const likePost = async (postId, userId, dispatch) => {
    try {
        const res = await axios.put(`${API_URL}/posts/${postId}/like`, { userId });
        if (res.data.success) {
            dispatch(likePostUp({ postId, userId }));
        } else {
            if (res.data.type) {
                dispatch(likePostDown({ postId, userId }));
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//add comment post
export const addCommentPost = async (postId, text) => {
    try {
        const res = await axios.post(`${API_URL}/comments/add`, {
            postId,
            text,
        });

        if (res.data.success) {
            return res.data.comment;
        }
    } catch (error) {
        console.log(error);
    }
};

//get my photo
export const getPhotos = async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/photos/me`);
        if (res.data.success) {
            dispatch(loadPhotoSuccess(res.data.photos));
        }
    } catch (error) {
        dispatch(loadPhotoFail());
    }
};
