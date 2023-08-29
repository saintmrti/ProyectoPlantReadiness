import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchMachinesApi, insertMachineApi, deleteMachineApi } from "../api";
import {
  machinesRequest,
  machinesSuccess,
  machinesError,
  insertMachineRequest,
  insertMachineSuccess,
  insertMachineError,
  deleteMachineRequest,
  deleteMachineSuccess,
  deleteMachineError,
} from "../slices/machines";

function* fetchMachines() {
  try {
    const { data, isError } = yield call(fetchMachinesApi.run);
    if (isError) throw new Error();
    yield put(machinesSuccess({ data }));
  } catch (e) {
    yield put(machinesError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchMachinesApi.cancel);
    }
  }
}

export function* fetchMachinesSaga() {
  yield takeLatest(machinesRequest.toString(), fetchMachines);
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
