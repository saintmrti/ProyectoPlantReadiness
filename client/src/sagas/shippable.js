import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  insertShippableApi,
  fetchShippableApi,
  updateShippableApi,
  deleteShippableApi,
} from "../api";
import {
  insertShippableRequest,
  insertShippableSuccess,
  insertShippableError,
  fetchShippableRequest,
  fetchShippableSuccess,
  fetchShippableError,
  updateShippableRequest,
  updateShippableSuccess,
  updateShippableError,
  deleteShippableRequest,
  deleteShippableSuccess,
  deleteShippableError,
} from "../slices/shippable";

function* fetchShippable() {
  try {
    const { data, isError } = yield call(fetchShippableApi.run);
    if (isError) throw new Error();
    yield put(fetchShippableSuccess({ data }));
  } catch (e) {
    yield put(fetchShippableError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchShippableApi.cancel);
    }
  }
}

export function* fetchShippableSaga() {
  yield takeLatest(fetchShippableRequest.toString(), fetchShippable);
}

function* insertShippable({ payload }) {
  try {
    const { data, isError } = yield call(insertShippableApi.run, payload);
    if (isError) throw new Error();
    yield put(insertShippableSuccess({ data }));
  } catch (e) {
    yield put(insertShippableError());
  } finally {
    if (yield cancelled()) {
      yield call(insertShippableApi.cancel);
    }
  }
}

export function* insertShippableSaga() {
  yield takeLatest(insertShippableRequest.toString(), insertShippable);
}

function* updateShippable({ payload }) {
  try {
    const { data, isError } = yield call(updateShippableApi.run, payload);
    if (isError) throw new Error();
    yield put(updateShippableSuccess({ data }));
  } catch (e) {
    yield put(updateShippableError());
  } finally {
    if (yield cancelled()) {
      yield call(updateShippableApi.cancel);
    }
  }
}

export function* updateShippableSaga() {
  yield takeLatest(updateShippableRequest.toString(), updateShippable);
}

function* deleteShippable({ payload: { idEntregable } }) {
  try {
    const { data, isError } = yield call(deleteShippableApi.run, idEntregable);
    if (isError) throw new Error();
    yield put(deleteShippableSuccess({ idEntregable: data }));
  } catch (e) {
    yield put(deleteShippableError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteShippableApi.cancel);
    }
  }
}

export function* deleteShippableSaga() {
  yield takeLatest(deleteShippableRequest.toString(), deleteShippable);
}