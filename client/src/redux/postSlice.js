import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: null,
        posts: [],
        postLoading: true,
        isShowAddModal: false,
        isShowEditModal: false,
        isShowDeleteModal: false,
    },
    reducers: {
        loadPostSuccess: (state, action) => {
            state.posts = action.payload;
            state.postLoading = false;
        },
        loadPostFail: (state) => {
            state.posts = [];
            state.postLoading = false;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        findPost: (state, action) => {
            state.post = action.payload;
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
            });
        },
        likePostUp: (state, action) => {
            const { postId, userId } = action.payload;
            state.posts = state.posts.map((post) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        likes: [...post.likes, userId],
                    };
                }
                return post;
            });
        },
        likePostDown: (state, action) => {
            const { postId, userId } = action.payload;
            state.posts = state.posts.map((post) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        likes: post.likes.filter((like) => like !== userId),
                    };
                }
                return post;
            });
        },
        setShowAddModal: (state, action) => {
            state.isShowAddModal = action.payload;
        },
        setShowEditModal: (state, action) => {
            state.isShowEditModal = action.payload;
        },
        setShowDeleteModal: (state, action) => {
            state.isShowDeleteModal = action.payload;
        },
    },
});

const { actions, reducer } = postSlice;
export const {
    loadPostSuccess,
    loadPostFail,
    addPost,
    deletePost,
    findPost,
    updatePost,
    likePostUp,
    likePostDown,
    setShowAddModal,
    setShowEditModal,
    setShowDeleteModal,
} = actions;
export default reducer;
