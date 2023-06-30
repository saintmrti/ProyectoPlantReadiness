import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { insertExpectancyApi, fetchExpectancyApi } from "../api";
import {
  insertExpectancyRequest,
  insertExpectancySuccess,
  insertExpectancyError,
  fetchExpectancyRequest,
  fetchExpectancySuccess,
  fetchExpectancyError,
} from "../slices/expectancy";

function* fetchExpectancy() {
  try {
    const { data, isError } = yield call(fetchExpectancyApi.run);
    if (isError) throw new Error();
    yield put(fetchExpectancySuccess({ data }));
  } catch (e) {
    yield put(fetchExpectancyError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchExpectancyApi.cancel);
    }
  }
}

export function* fetchExpectancySaga() {
  yield takeLatest(fetchExpectancyRequest.toString(), fetchExpectancy);
}

function* insertExpectancy({ payload }) {
  try {
    const { data, isError } = yield call(insertExpectancyApi.run, payload);
    if (isError) throw new Error();
    yield put(insertExpectancySuccess({ data }));
    yield put(fetchExpectancyRequest());
  } catch (e) {
    yield put(insertExpectancyError());
  } finally {
    if (yield cancelled()) {
      yield call(insertExpectancyApi.cancel);
    }
  }
}

export function* insertExpectancySaga() {
  yield takeLatest(insertExpectancyRequest.toString(), insertExpectancy);
}
