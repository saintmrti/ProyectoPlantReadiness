import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchMachinesApi, insertMachineApi, deleteMachineApi } from "../api";
import {
  fetchMachinesRequest,
  fetchMachinesSuccess,
  fetchMachinesError,
  insertMachineRequest,
  insertMachineSuccess,
  insertMachineError,
  deleteMachineRequest,
  deleteMachineSuccess,
  deleteMachineError,
} from "../slices/machines";

function* fetchMachines({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(fetchMachinesApi.run, idProyecto);
    if (isError) throw new Error();
    yield put(fetchMachinesSuccess({ data }));
  } catch (e) {
    yield put(fetchMachinesError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchMachinesApi.cancel);
    }
  }
}

export function* fetchMachinesSaga() {
  yield takeLatest(fetchMachinesRequest.toString(), fetchMachines);
}

function* insertMachine({ payload }) {
  try {
    const { data, isError } = yield call(insertMachineApi.run, payload);
    if (isError) throw new Error();
    yield put(insertMachineSuccess({ data }));
  } catch (e) {
    yield put(insertMachineError());
  } finally {
    if (yield cancelled()) {
      yield call(insertMachineApi.cancel);
    }
  }
}

export function* insertMachineSaga() {
  yield takeLatest(insertMachineRequest.toString(), insertMachine);
}

function* deleteMachine({ payload: { idMaquina } }) {
  try {
    const { data, isError } = yield call(deleteMachineApi.run, idMaquina);
    if (isError) throw new Error();
    yield put(deleteMachineSuccess({ idMaquina: data }));
  } catch (e) {
    yield put(deleteMachineError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteMachineApi.cancel);
    }
  }
}

export function* deleteMachineSaga() {
  yield takeLatest(deleteMachineRequest.toString(), deleteMachine);
}
