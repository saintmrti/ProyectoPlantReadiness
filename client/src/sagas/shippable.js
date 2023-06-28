import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { insertShippableApi, fetchShippableApi } from "../api";
import {
  insertShippableRequest,
  insertShippableSuccess,
  insertShippableError,
  fetchShippableRequest,
  fetchShippableSuccess,
  fetchShippableError,
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
