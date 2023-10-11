import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "users",
  initialState: {
    list: {},
    isFetching: false,
    didError: false,
    isFetchingUpdate: false,
    didErrorUpdate: false,
  },
  reducers: {
    fetchUsersRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchUsersSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = data;
      state.isFetching = false;
    },
    fetchUsersError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    updateUsersRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateUsersSuccess: (state, { payload: { data } }) => {
      state.list = data;
      state.isFetchingUpdate = false;
    },
    updateUsersError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  updateUsersRequest,
  updateUsersSuccess,
  updateUsersError,
} = Slice.actions;
export default Slice.reducer;
