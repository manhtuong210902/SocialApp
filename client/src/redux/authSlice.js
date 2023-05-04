import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        isShowUploadAvatar: false,
    },
    reducers: {
        loadUserSuccess: (state, action) => {
            state.authLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail: (state) => {
            state.authLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        uploadAvatar: (state, action) => {
            state.user = { ...state.user, avatar: action.payload };
        },
        setShowUploadAvatar: (state, action) => {
            state.isShowUploadAvatar = action.payload;
        },
    },
});

const { actions, reducer } = authSlice;
export const { loadUserSuccess, loadUserFail, uploadAvatar, setShowUploadAvatar } = actions;
export default reducer;
