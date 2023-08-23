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
    isFetchingUpdate: false,
    didErrorUpdate: false,
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
    updateAdvanceRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateAdvanceSuccess: (state, { payload: { data } }) => {
      state.data[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateAdvanceError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
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
  updateAdvanceRequest,
  updateAdvanceSuccess,
  updateAdvanceError,
} = Slice.actions;
export default Slice.reducer;
