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
    isFetchingUpdate: false,
    didErrorUpdate: false,
    isFetchingDelete: false,
    didErrorDelete: false,
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
      state.list[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertPhaseError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updatePhaseRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updatePhaseSuccess: (state, { payload: { data } }) => {
      state.list[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updatePhaseError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deletePhaseRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deletePhaseSuccess: (state, { payload: { idFase } }) => {
      delete state.list[idFase];
      state.isFetchingDelete = false;
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
  updatePhaseRequest,
  updatePhaseSuccess,
  updatePhaseError,
  deletePhaseRequest,
  deletePhaseSuccess,
  deletePhaseError,
} = Slice.actions;
export default Slice.reducer;
