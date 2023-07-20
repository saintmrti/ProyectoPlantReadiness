import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "phase",
  initialState: {
    list: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
  },
  reducers: {
    fetchPhaseRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchPhaseSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchPhaseError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertPhaseRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertPhaseSuccess: (state, { payload: { data } }) => {
      _.forEach(data, (item) => {
        state.list[item.id] = item;
      });
      state.isFetchingInsert = false;
    },
    insertPhaseError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
  },
});

export const {
  fetchPhaseRequest,
  fetchPhaseSuccess,
  fetchPhaseError,
  insertPhaseRequest,
  insertPhaseSuccess,
  insertPhaseError,
} = Slice.actions;
export default Slice.reducer;
