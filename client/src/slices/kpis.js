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
    fetchKpisRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchKpisSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetching = false;
    },
    fetchKpisError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
  },
});

export const { fetchKpisRequest, fetchKpisSuccess, fetchKpisError } =
  Slice.actions;
export default Slice.reducer;
