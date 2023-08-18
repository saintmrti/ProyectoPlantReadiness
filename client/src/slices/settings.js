import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: 'settings',
    initialState: () => {
        const theme = localStorage.getItem('vki40_theme');
        return {
            theme: theme ? theme : 'light',
        }
    },
    reducers: {
        changeTheme: (state, action) => {
            localStorage.setItem('vki40_theme', action.payload);
            state.theme = action.payload;
        },
    }
});

export const { changeTheme } = Slice.actions;
export default Slice.reducer;