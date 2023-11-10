import { takeLatest, call, put, cancelled } from "redux-saga/effects";
import { router } from "../components/routes";

import { insertAdvanceApi, fetchAdvanceApi, updateAdvanceApi } from "../api";
import {
  insertAdvanceRequest,
  insertAdvanceSuccess,
  insertAdvanceError,
  fetchAdvanceRequest,
  fetchAdvanceSuccess,
  fetchAdvanceError,
  updateAdvanceError,
  updateAdvanceRequest,
  updateAdvanceSuccess,
} from "../slices/advance";

function* fetchAdvance({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(fetchAdvanceApi.run, idProyecto);
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

function* insertAdvance({ payload: { idProyecto, ...payload } }) {
  try {
    const { data, isError } = yield call(insertAdvanceApi.run, payload);
    if (isError) throw new Error();
    yield put(insertAdvanceSuccess({ data }));
    if (idProyecto) router.navigate(`/proyectos/${idProyecto}/registro`);
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

function* updateAdvance({ payload }) {
  try {
    const { data, isError } = yield call(updateAdvanceApi.run, payload);
    if (isError) throw new Error();
    yield put(updateAdvanceSuccess({ data }));
  } catch (e) {
    yield put(updateAdvanceError());
  } finally {
    if (yield cancelled()) {
      yield call(updateAdvanceApi.cancel);
    }
  }
}

export function* updateAdvanceSaga() {
  yield takeLatest(updateAdvanceRequest.toString(), updateAdvance);
}
