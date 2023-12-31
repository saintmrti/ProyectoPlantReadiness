import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "machines",
  initialState: {
    list: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    isFetchingDelete: false,
    didErrorDelete: false,
  },
  reducers: {
    fetchMachinesRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchMachinesSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchMachinesError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertMachineRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertMachineSuccess: (state, { payload: { data } }) => {
      _.forEach(data, (machine) => {
        state.list[machine.id] = machine;
      });
      state.isFetchingInsert = false;
    },
    insertMachineError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    deleteMachineRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteMachineSuccess: (state, { payload: { idMaquina } }) => {
      delete state.list[idMaquina];
      state.isFetchingDelete = false;
    },
    deleteMachineError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchMachinesRequest,
  fetchMachinesSuccess,
  fetchMachinesError,
  insertMachineRequest,
  insertMachineSuccess,
  insertMachineError,
  deleteMachineRequest,
  deleteMachineSuccess,
  deleteMachineError,
} = Slice.actions;
export default Slice.reducer;
