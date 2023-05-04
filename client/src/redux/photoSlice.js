import { createSlice } from '@reduxjs/toolkit';

const photoSlice = createSlice({
    name: 'photo',
    initialState: {
        photos: [],
        photoLoading: true,
    },
    reducers: {
        loadPhotoSuccess: (state, action) => {
            state.photos = action.payload;
            state.photoLoading = false;
        },
        loadPhotoFail: (state) => {
            state.photos = [];
            state.photoLoading = false;
        },
        addPhoto: (state, action) => {
            state.photos.unshift(action.payload);
        },
    },
});

const { actions, reducer } = photoSlice;
export const { loadPhotoFail, loadPhotoSuccess, addPhoto } = actions;
export default reducer;
