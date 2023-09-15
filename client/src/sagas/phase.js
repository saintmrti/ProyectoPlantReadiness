import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { insertPhaseApi, fetchPhaseApi } from "../api";
import {
  insertPhaseRequest,
  insertPhaseSuccess,
  insertPhaseError,
  fetchPhaseRequest,
  fetchPhaseSuccess,
  fetchPhaseError,
} from "../slices/phase";

function* fetchPhase({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(fetchPhaseApi.run, idProyecto);
    if (isError) throw new Error();
    yield put(fetchPhaseSuccess({ data }));
  } catch (e) {
    yield put(fetchPhaseError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchPhaseApi.cancel);
    }
  }
}

export function* fetchPhaseSaga() {
  yield takeLatest(fetchPhaseRequest.toString(), fetchPhase);
}

function* insertPhase({ payload }) {
  try {
    const { data, isError } = yield call(insertPhaseApi.run, payload);
    if (isError) throw new Error();
    yield put(insertPhaseSuccess({ data }));
  } catch (e) {
    yield put(insertPhaseError());
  } finally {
    if (yield cancelled()) {
      yield call(insertPhaseApi.cancel);
    }
  }
}

export function* insertPhaseSaga() {
  yield takeLatest(insertPhaseRequest.toString(), insertPhase);
}
