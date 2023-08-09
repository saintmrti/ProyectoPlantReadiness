import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchMachinesApi, insertMachineApi } from "../api";
import {
  machinesRequest,
  machinesSuccess,
  machinesError,
  insertMachineRequest,
  insertMachineSuccess,
  insertMachineError,
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
