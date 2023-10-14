import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "products",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    didErrorUpdate: false,
    isFetchingUpdate: false,
    didErrorDelete: false,
    isFetchingDelete: false,
  },
  reducers: {
    fetchProductsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchProductsSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchProductsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertProductsRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertProductsSuccess: (state, { payload: { data } }) => {
      _.forEach(data, (value) => {
        state.data[value.id] = value;
      });
      state.isFetchingInsert = false;
    },
    insertProductsError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    updateProductsRequest: (state) => {
      state.isFetchingUpdate = true;
      state.didErrorUpdate = false;
    },
    updateProductsSuccess: (state, { payload: { data } }) => {
      _.forEach(state.data, (value) => {
        if (value.idMaquina === data[0]?.idMaquina) {
          delete state.data[value.id];
        }
      });
      _.forEach(data, (value) => {
        state.data[value.id] = value;
      });
      state.isFetchingUpdate = false;
    },
    updateProductsError: (state) => {
      state.isFetchingUpdate = false;
      state.didErrorUpdate = true;
    },
    deleteProductsRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteProductsSuccess: (state, { payload: { idMaquina } }) => {
      _.forEach(state.data, (value) => {
        if (value.idMaquina === idMaquina) {
          delete state.data[value.id];
        }
      });
      state.isFetchingDelete = false;
    },
    deleteProductsError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  insertProductsRequest,
  insertProductsSuccess,
  insertProductsError,
  updateProductsRequest,
  updateProductsSuccess,
  updateProductsError,
  deleteProductsRequest,
  deleteProductsSuccess,
  deleteProductsError,
} = Slice.actions;
export default Slice.reducer;
