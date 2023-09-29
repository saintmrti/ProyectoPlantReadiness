import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchKpisApi } from "../api";
import {
  fetchKpisRequest,
  fetchKpisSuccess,
  fetchKpisError,
} from "../slices/kpis";

function* fetchKpis({ payload }) {
  try {
    const { data, isError } = yield call(fetchKpisApi.run, payload);
    if (isError) throw new Error();
    yield put(fetchKpisSuccess({ data }));
  } catch (e) {
    yield put(fetchKpisError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchKpisApi.cancel);
    }
  }
}

export function* fetchKpisSaga() {
  yield takeLatest(fetchKpisRequest.toString(), fetchKpis);
}
