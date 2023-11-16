import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchChampionsApi,
  insertChampionApi,
  updateChampionApi,
  deleteChampionApi,
} from "../api/champions";
import {
  fetchChampionsRequest,
  fetchChampionsSuccess,
  fetchChampionsError,
  insertChampionRequest,
  insertChampionSuccess,
  insertChampionError,
  updateChampionRequest,
  updateChampionSuccess,
  updateChampionError,
  deleteChampionRequest,
  deleteChampionSuccess,
  deleteChampionError,
} from "../slices/champions";

function* fetchChampions({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(fetchChampionsApi.run, idProyecto);
    if (isError) throw new Error();
    yield put(fetchChampionsSuccess({ data }));
  } catch (e) {
    yield put(fetchChampionsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchChampionsApi.cancel);
    }
  }
}

export function* fetchChampionsSaga() {
  yield takeLatest(fetchChampionsRequest.toString(), fetchChampions);
}

function* insertChampions({ payload }) {
  try {
    const { data, isError } = yield call(insertChampionApi.run, payload);
    if (isError) throw new Error();
    yield put(insertChampionSuccess({ data }));
  } catch (e) {
    yield put(insertChampionError());
  } finally {
    if (yield cancelled()) {
      yield call(insertChampionApi.cancel);
    }
  }
}

export function* insertChampionsSaga() {
  yield takeLatest(insertChampionRequest.toString(), insertChampions);
}

function* updateChampions({ payload }) {
  try {
    const { data, isError } = yield call(updateChampionApi.run, payload);
    if (isError) throw new Error();
    yield put(updateChampionSuccess({ data }));
  } catch (e) {
    yield put(updateChampionError());
  } finally {
    if (yield cancelled()) {
      yield call(updateChampionApi.cancel);
    }
  }
}

export function* updateChampionsSaga() {
  yield takeLatest(updateChampionRequest.toString(), updateChampions);
}

function* deleteChampions({ payload: { idChampion } }) {
  try {
    const { isError } = yield call(deleteChampionApi.run, idChampion);
    if (isError) throw new Error();
    yield put(deleteChampionSuccess({ idChampion }));
  } catch (e) {
    yield put(deleteChampionError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteChampionApi.cancel);
    }
  }
}

export function* deleteChampionsSaga() {
  yield takeLatest(deleteChampionRequest.toString(), deleteChampions);
}
