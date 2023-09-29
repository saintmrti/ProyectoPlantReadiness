import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchHeadingsApi,
  insertHeadingsApi,
  updateHeadingsApi,
  deleteHeadingsApi,
} from "../api";
import {
  fetchHeadingsRequest,
  fetchHeadingsSuccess,
  fetchHeadingsError,
  insertHeadingsRequest,
  insertHeadingsSuccess,
  insertHeadingsError,
  updateHeadingsRequest,
  updateHeadingsSuccess,
  updateHeadingsError,
  deleteHeadingsRequest,
  deleteHeadingsSuccess,
  deleteHeadingsError,
} from "../slices/headings";

function* fetchHeadings({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(fetchHeadingsApi.run, idProyecto);
    if (isError) throw new Error();
    yield put(fetchHeadingsSuccess({ data }));
  } catch (e) {
    yield put(fetchHeadingsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchHeadingsApi.cancel);
    }
  }
}

export function* fetchHeadingsSaga() {
  yield takeLatest(fetchHeadingsRequest.toString(), fetchHeadings);
}

function* insertHeading({ payload }) {
  try {
    const { data, isError } = yield call(insertHeadingsApi.run, payload);
    if (isError) throw new Error();
    yield put(insertHeadingsSuccess({ data }));
  } catch (e) {
    yield put(insertHeadingsError());
  } finally {
    if (yield cancelled()) {
      yield call(insertHeadingsApi.cancel);
    }
  }
}

export function* insertHeadingSaga() {
  yield takeLatest(insertHeadingsRequest.toString(), insertHeading);
}

function* updateHeading({ payload }) {
  try {
    const { data, isError } = yield call(updateHeadingsApi.run, payload);
    if (isError) throw new Error();
    yield put(updateHeadingsSuccess({ data }));
  } catch (e) {
    yield put(updateHeadingsError());
  } finally {
    if (yield cancelled()) {
      yield call(updateHeadingsApi.cancel);
    }
  }
}

export function* updateHeadingSaga() {
  yield takeLatest(updateHeadingsRequest.toString(), updateHeading);
}

function* deleteHeading({ payload: { idRubro } }) {
  try {
    const { data, isError } = yield call(deleteHeadingsApi.run, idRubro);
    if (isError) throw new Error();
    yield put(deleteHeadingsSuccess({ idRubro: data }));
  } catch (e) {
    yield put(deleteHeadingsError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteHeadingsApi.cancel);
    }
  }
}

export function* deleteHeadingSaga() {
  yield takeLatest(deleteHeadingsRequest.toString(), deleteHeading);
}
