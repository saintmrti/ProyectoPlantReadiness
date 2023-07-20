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
  },
});

export const {
  fetchExpectancyRequest,
  fetchExpectancySuccess,
  fetchExpectancyError,
  insertExpectancyRequest,
  insertExpectancySuccess,
  insertExpectancyError,
} = Slice.actions;
export default Slice.reducer;
