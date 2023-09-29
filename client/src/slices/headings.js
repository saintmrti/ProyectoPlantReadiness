import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "headings",
  initialState: {
    list: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    isFetchingUpdate: false,
    didErrorUpdate: false,
    isFetchingDelete: false,
    didErrorDelete: false,
  },
  reducers: {
    fetchHeadingsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchHeadingsSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchHeadingsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertHeadingsRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertHeadingsSuccess: (state, { payload: { data } }) => {
      state.list[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertHeadingsError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateHeadingsRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    updateHeadingsSuccess: (state, { payload: { data } }) => {
      state.list[data.id] = data;
      state.isFetchingInsert = false;
    },
    updateHeadingsError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    deleteHeadingsRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    deleteHeadingsSuccess: (state, { payload: { idRubro } }) => {
      delete state.list[idRubro];
      state.isFetchingInsert = false;
    },
    deleteHeadingsError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
  },
});

export const {
  fetchHeadingsRequest,
  fetchHeadingsSuccess,
  fetchHeadingsError,
  insertHeadingsRequest,
  insertHeadingsSuccess,
  insertHeadingsError,
  updateHeadingsRequest,
  updateHeadingsSuccess,
  updateHeadingsError,
  deleteHeadingsRequest,
  deleteHeadingsSuccess,
  deleteHeadingsError,
} = Slice.actions;
export default Slice.reducer;
