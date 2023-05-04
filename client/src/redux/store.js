import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './postSlice';
import photoSlice from './photoSlice';
import socketSlice from './socketSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        photo: photoSlice,
        socket: socketSlice,
    },
});

export default store;
