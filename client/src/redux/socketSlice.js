import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
    },
    reducers: {
        getSocket: (state, action) => {
            state.socket = action.payload;
        },
    },
});

const { actions, reducer } = socketSlice;
export const { getSocket } = actions;
export default reducer;
