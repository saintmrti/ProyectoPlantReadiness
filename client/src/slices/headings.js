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
  },
  reducers: {
    headingsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    headingsSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = _.keyBy(data, "id");
      state.isFetching = false;
    },
    headingsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    headingsInsertRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    headingsInsertSuccess: (state, { payload: { data } }) => {
      state.list[data.id] = data;
      state.isFetchingInsert = false;
    },
    headingsInsertError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
  },
});

export const {
  headingsRequest,
  headingsSuccess,
  headingsError,
  headingsInsertError,
  headingsInsertRequest,
  headingsInsertSuccess,
} = Slice.actions;
export default Slice.reducer;
