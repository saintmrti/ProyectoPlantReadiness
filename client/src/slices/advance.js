import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "advance",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
  },
  reducers: {
    fetchAdvanceRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchAdvanceSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchAdvanceError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertAdvanceRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertAdvanceSuccess: (state, { payload: { data } }) => {
      _.forEach(data, (item) => {
        state.data[item.id] = item;
      });
      state.isFetchingInsert = false;
    },
    insertAdvanceError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
  },
});

export const {
  fetchAdvanceRequest,
  fetchAdvanceSuccess,
  fetchAdvanceError,
  insertAdvanceRequest,
  insertAdvanceSuccess,
  insertAdvanceError,
} = Slice.actions;
export default Slice.reducer;
