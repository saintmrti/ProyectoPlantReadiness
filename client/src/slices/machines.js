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
    machinesRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    machinesSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = _.keyBy(data, "id");
      state.isFetching = false;
    },
    machinesError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertMachineRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertMachineSuccess: (state, { payload: { data } }) => {
      state.list[data.id] = data;
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
  machinesRequest,
  machinesSuccess,
  machinesError,
  insertMachineRequest,
  insertMachineSuccess,
  insertMachineError,
  deleteMachineRequest,
  deleteMachineSuccess,
  deleteMachineError,
} = Slice.actions;
export default Slice.reducer;
