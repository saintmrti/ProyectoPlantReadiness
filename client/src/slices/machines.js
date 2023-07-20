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
  },
});

export const {
  machinesRequest,
  machinesSuccess,
  machinesError,
  insertMachineRequest,
  insertMachineSuccess,
  insertMachineError,
} = Slice.actions;
export default Slice.reducer;
