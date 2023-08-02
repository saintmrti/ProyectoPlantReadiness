import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchKpisApi } from "../api";
import { kpisRequest, kpisSuccess, kpisError } from "../slices/kpis";

function* fetchKpis({ payload }) {
  try {
    const { data, isError } = yield call(fetchKpisApi.run, payload);
    if (isError) throw new Error();
    yield put(kpisSuccess({ data }));
  } catch (e) {
    yield put(kpisError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchKpisApi.cancel);
    }
  }
}

export function* fetchKpisSaga() {
  yield takeLatest(kpisRequest.toString(), fetchKpis);
}
