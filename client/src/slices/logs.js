import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

const Slice = createSlice({
  name: "logs",
  initialState: {
    data: [],
    isFetching: false,
    didError: false,
  },
  reducers: {
    fetchLogsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchLogsSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetching = false;
    },
    fetchLogsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
  },
});

export const { fetchLogsRequest, fetchLogsSuccess, fetchLogsError } =
  Slice.actions;
export default Slice.reducer;
