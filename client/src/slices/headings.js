import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: 'headings',
    initialState: {
        list: {},
        isFetching: false,
        didError: false
    },
    reducers: {
        headingsRequest: state => {
                state.isFetching = true;
                state.didError = false;
        },
        headingsSuccess: (state, action) => {
            const { data } = action.payload;
            state.list = data;
            state.isFetching = false;
        },
        headingsError: state => {
            state.isFetching = false;
            state.didError = true;
        },
    }
});

export const { headingsRequest, headingsSuccess, headingsError } = Slice.actions;
export default Slice.reducer;