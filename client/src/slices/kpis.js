import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

const Slice = createSlice({
  name: "kpis",
  initialState: {
    data: [],
    isFetching: false,
    didError: false,
  },
  reducers: {
    kpisRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    kpisSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetching = false;
    },
    kpisError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
  },
});

export const { kpisRequest, kpisSuccess, kpisError } = Slice.actions;
export default Slice.reducer;
