import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchHeadingsApi, insertHeadingsApi } from "../api";
import {
  headingsRequest,
  headingsSuccess,
  headingsError,
  headingsInsertRequest,
  headingsInsertSuccess,
  headingsInsertError,
} from "../slices/headings";

function* fetchHeadings() {
  try {
    const { data, isError } = yield call(fetchHeadingsApi.run);
    if (isError) throw new Error();
    yield put(headingsSuccess({ data }));
  } catch (e) {
    yield put(headingsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchHeadingsApi.cancel);
    }
  }
}

export function* fetchHeadingsSaga() {
  yield takeLatest(headingsRequest.toString(), fetchHeadings);
}

function* insertHeading({ payload }) {
  try {
    const { data, isError } = yield call(insertHeadingsApi.run, payload);
    if (isError) throw new Error();
    yield put(headingsInsertSuccess({ data }));
  } catch (e) {
    yield put(headingsInsertError());
  } finally {
    if (yield cancelled()) {
      yield call(insertHeadingsApi.cancel);
    }
  }
}

export function* insertHeadingSaga() {
  yield takeLatest(headingsInsertRequest.toString(), insertHeading);
}
