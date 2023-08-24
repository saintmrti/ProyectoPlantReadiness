import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "shippable",
  initialState: {
    data: {},
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
    fetchShippableRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchShippableSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchShippableError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertShippableRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertShippableSuccess: (state, { payload: { data } }) => {
      state.data[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertShippableError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateShippableRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateShippableSuccess: (state, { payload: { data } }) => {
      state.data[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateShippableError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteShippableRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteShippableSuccess: (state, { payload: { idEntregable } }) => {
      delete state.data[idEntregable];
      state.isFetchingDelete = false;
    },
    deleteShippableError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchShippableRequest,
  fetchShippableSuccess,
  fetchShippableError,
  insertShippableRequest,
  insertShippableSuccess,
  insertShippableError,
  updateShippableRequest,
  updateShippableSuccess,
  updateShippableError,
  deleteShippableRequest,
  deleteShippableSuccess,
  deleteShippableError,
} = Slice.actions;
export default Slice.reducer;
