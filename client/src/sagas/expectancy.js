import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  insertExpectancyApi,
  fetchExpectancyApi,
  updateExpectancyApi,
  deleteExpectancyApi,
} from "../api";
import {
  insertExpectancyRequest,
  insertExpectancySuccess,
  insertExpectancyError,
  fetchExpectancyRequest,
  fetchExpectancySuccess,
  fetchExpectancyError,
  updateExpectancyRequest,
  updateExpectancySuccess,
  updateExpectancyError,
  deleteExpectancyRequest,
  deleteExpectancySuccess,
  deleteExpectancyError,
} from "../slices/expectancy";

function* fetchExpectancy({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(fetchExpectancyApi.run, idProyecto);
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

function* updateExpectancy({ payload }) {
  try {
    const { data, isError } = yield call(updateExpectancyApi.run, payload);
    if (isError) throw new Error();
    yield put(updateExpectancySuccess({ data }));
  } catch (e) {
    yield put(updateExpectancyError());
  } finally {
    if (yield cancelled()) {
      yield call(updateExpectancyApi.cancel);
    }
  }
}

export function* updateExpectancySaga() {
  yield takeLatest(updateExpectancyRequest.toString(), updateExpectancy);
}

function* deleteExpectancy({ payload: { idExpectativa } }) {
  try {
    const { data, isError } = yield call(
      deleteExpectancyApi.run,
      idExpectativa
    );
    if (isError) throw new Error();
    yield put(deleteExpectancySuccess({ idExpectativa: data }));
  } catch (e) {
    yield put(deleteExpectancyError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteExpectancyApi.cancel);
    }
  }
}

export function* deleteExpectancySaga() {
  yield takeLatest(deleteExpectancyRequest.toString(), deleteExpectancy);
}
