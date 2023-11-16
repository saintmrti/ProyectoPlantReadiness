import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "../slices";
import initSagas from "../utilities/initSagas";
import tokenMiddleware from "../middlewares/tokenMiddleware";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: [tokenMiddleware, sagaMiddleware],
});

initSagas(sagaMiddleware);
