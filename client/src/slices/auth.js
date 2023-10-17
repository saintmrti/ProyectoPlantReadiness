import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const getInitialState = () => {
  const token = localStorage.getItem("vki40_token");
  const state = {
    isAuth: false,
    token: null,
    tokenData: {},
    isFetching: false,
    didError: false,
    status: null,
  };
  if (token) {
    state.isAuth = true;
    state.token = token;
    state.tokenData = jwtDecode(token);
  }
  return state;
};

const Slice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    authRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    authSuccess: (state, action) => {
      const token = action.payload;
      state.isAuth = true;
      state.token = token;
      state.tokenData = jwtDecode(token);
      state.isFetching = false;
    },
    authError: (state, action) => {
      state.isFetching = false;
      state.didError = true;
      state.status = action.payload;
    },
    authSignOut: (state) => {
      state.isAuth = false;
      state.token = null;
      state.tokenData = {};
    },
  },
});

export const { authRequest, authSuccess, authError, authSignOut } =
  Slice.actions;
export default Slice.reducer;
