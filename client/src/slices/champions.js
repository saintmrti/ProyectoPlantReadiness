import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "champions",
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
    fetchChampionsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchChampionsSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchChampionsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertChampionRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertChampionSuccess: (state, { payload: { data } }) => {
      state.list[data.id] = data;
      state.isFetchingInsert = false;
    },
    insertChampionError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateChampionRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateChampionSuccess: (state, { payload: { data } }) => {
      state.list[data.id] = data;
      state.isFetchingUpdate = false;
    },
    updateChampionError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteChampionRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteChampionSuccess: (state, { payload: { idChampion } }) => {
      delete state.list[idChampion];
      state.isFetchingDelete = false;
    },
    deleteChampionError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchChampionsRequest,
  fetchChampionsSuccess,
  fetchChampionsError,
  insertChampionRequest,
  insertChampionSuccess,
  insertChampionError,
  updateChampionRequest,
  updateChampionSuccess,
  updateChampionError,
  deleteChampionRequest,
  deleteChampionSuccess,
  deleteChampionError,
} = Slice.actions;
export default Slice.reducer;
