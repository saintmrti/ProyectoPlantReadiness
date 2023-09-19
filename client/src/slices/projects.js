import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "projects",
  initialState: {
    list: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
  },
  reducers: {
    fetchProjectsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchProjectsSuccess: (state, action) => {
      const { data } = action.payload;
      state.list = _.keyBy(data, "idProyecto");
      state.isFetching = false;
    },
    fetchProjectsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertProjectRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertProjectSuccess: (state, { payload: { data } }) => {
      state.list[data.idProyecto] = data;
      state.isFetchingInsert = false;
    },
    insertProjectError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
  },
});

export const {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsError,
  insertProjectRequest,
  insertProjectSuccess,
  insertProjectError,
} = Slice.actions;
export default Slice.reducer;
