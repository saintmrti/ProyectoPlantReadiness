import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "expectancy",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    didErrorUpdate: false,
    isFetchingUpdate: false,
    didErrorDelete: false,
    isFetchingDelete: false,
  },
  reducers: {
    fetchExpectancyRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchExpectancySuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchExpectancyError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertExpectancyRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertExpectancySuccess: (state, { payload: { data } }) => {
      state.data[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertExpectancyError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateExpectancyRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateExpectancySuccess: (state, { payload: { data } }) => {
      state.data[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateExpectancyError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteExpectancyRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteExpectancySuccess: (state, { payload: { idExpectativa } }) => {
      delete state.data[idExpectativa];
      state.isFetchingDelete = false;
    },
    deleteExpectancyError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchExpectancyRequest,
  fetchExpectancySuccess,
  fetchExpectancyError,
  insertExpectancyRequest,
  insertExpectancySuccess,
  insertExpectancyError,
  updateExpectancyRequest,
  updateExpectancySuccess,
  updateExpectancyError,
  deleteExpectancyRequest,
  deleteExpectancySuccess,
  deleteExpectancyError,
} = Slice.actions;
export default Slice.reducer;
