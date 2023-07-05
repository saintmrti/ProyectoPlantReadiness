import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: 'machines',
    initialState: {
        list: {},
        isFetching: false,
        didError: false
    },
    reducers: {
        machinesRequest: state => {
                state.isFetching = true;
                state.didError = false;
        },
        machinesSuccess: (state, action) => {
            const { data } = action.payload;
            state.list = data;
            state.isFetching = false;
        },
        machinesError: state => {
            state.isFetching = false;
            state.didError = true;
        },
    }
});

export const { machinesRequest, machinesSuccess, machinesError } = Slice.actions;
export default Slice.reducer;