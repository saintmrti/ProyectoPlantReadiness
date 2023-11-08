import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchLogsApi } from "../api";
import {
  fetchLogsRequest,
  fetchLogsSuccess,
  fetchLogsError,
} from "../slices/logs";

function* fetchLogs({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(fetchLogsApi.run, idProyecto);
    if (isError) throw new Error();
    yield put(fetchLogsSuccess({ data }));
  } catch (e) {
    yield put(fetchLogsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchLogsApi.cancel);
    }
  }
}

export function* fetchLogsSaga() {
  yield takeLatest(fetchLogsRequest.toString(), fetchLogs);
}
