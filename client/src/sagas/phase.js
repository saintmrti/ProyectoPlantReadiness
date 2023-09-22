import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  insertPhaseApi,
  fetchPhaseApi,
  updatePhaseApi,
  deletePhaseApi,
} from "../api";
import {
  insertPhaseRequest,
  insertPhaseSuccess,
  insertPhaseError,
  fetchPhaseRequest,
  fetchPhaseSuccess,
  fetchPhaseError,
  updatePhaseRequest,
  updatePhaseSuccess,
  updatePhaseError,
  deletePhaseRequest,
  deletePhaseSuccess,
  deletePhaseError,
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

function* updatePhase({ payload }) {
  try {
    const { data, isError } = yield call(updatePhaseApi.run, payload);
    if (isError) throw new Error();
    yield put(updatePhaseSuccess({ data }));
  } catch (e) {
    yield put(updatePhaseError());
  } finally {
    if (yield cancelled()) {
      yield call(updatePhaseApi.cancel);
    }
  }
}

export function* updatePhaseSaga() {
  yield takeLatest(updatePhaseRequest.toString(), updatePhase);
}

function* deletePhase({ payload }) {
  try {
    const { data, isError } = yield call(deletePhaseApi.run, payload);
    if (isError) throw new Error();
    yield put(deletePhaseSuccess({ idGrupo: data }));
  } catch (e) {
    yield put(deletePhaseError());
  } finally {
    if (yield cancelled()) {
      yield call(deletePhaseApi.cancel);
    }
  }
}

export function* deletePhaseSaga() {
  yield takeLatest(deletePhaseRequest.toString(), deletePhase);
}
