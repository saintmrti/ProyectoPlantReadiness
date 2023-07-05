import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { insertAdvanceApi, fetchAdvanceApi } from "../api";
import {
  insertAdvanceRequest,
  insertAdvanceSuccess,
  insertAdvanceError,
  fetchAdvanceRequest,
  fetchAdvanceSuccess,
  fetchAdvanceError,
} from "../slices/advance";

function* fetchAdvance({ payload: { idEntregable } }) {
  try {
    console.log(idEntregable);
    const { data, isError } = yield call(fetchAdvanceApi.run, { idEntregable });
    if (isError) throw new Error();
    yield put(fetchAdvanceSuccess({ data }));
  } catch (e) {
    yield put(fetchAdvanceError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchAdvanceApi.cancel);
    }
  }
}

export function* fetchAdvanceSaga() {
  yield takeLatest(fetchAdvanceRequest.toString(), fetchAdvance);
}

function* insertAdvance({ payload }) {
  try {
    const { idEntregable } = payload;
    const { data, isError } = yield call(insertAdvanceApi.run, payload);
    if (isError) throw new Error();
    yield put(insertAdvanceSuccess({ data }));
    yield put(fetchAdvanceRequest({ idEntregable }));
  } catch (e) {
    yield put(insertAdvanceError());
  } finally {
    if (yield cancelled()) {
      yield call(insertAdvanceApi.cancel);
    }
  }
}

export function* insertAdvanceSaga() {
  yield takeLatest(insertAdvanceRequest.toString(), insertAdvance);
}
