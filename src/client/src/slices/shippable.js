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
  },
});

export const {
  fetchShippableRequest,
  fetchShippableSuccess,
  fetchShippableError,
  insertShippableRequest,
  insertShippableSuccess,
  insertShippableError,
} = Slice.actions;
export default Slice.reducer;
