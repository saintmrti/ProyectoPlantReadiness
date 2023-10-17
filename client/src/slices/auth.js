import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const getInitialState = () => {
  const token = localStorage.getItem("vki40_token");
  const hasAccess = localStorage.getItem("vki40_hasAccess");
  const state = {
    isAuth: false,
    token: null,
    tokenData: {},
    isFetching: false,
    didError: false,
    status: null,
    hasAccess: hasAccess ? hasAccess : "false",
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
    changeAccess: (state, action) => {
      console.log(action.payload);
      localStorage.setItem("vki40_hasAccess", action.payload);
      state.hasAccess = action.payload;
    },
  },
});

export const {
  authRequest,
  authSuccess,
  authError,
  authSignOut,
  changeAccess,
} = Slice.actions;
export default Slice.reducer;
