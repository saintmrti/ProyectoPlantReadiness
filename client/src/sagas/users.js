import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchUsersApi, updateUsersApi } from "../api";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  updateUsersRequest,
  updateUsersSuccess,
  updateUsersError,
} from "../slices/users";

function* fetchUsers() {
  try {
    const { data, isError } = yield call(fetchUsersApi.run);
    if (isError) throw new Error();
    yield put(fetchUsersSuccess({ data }));
  } catch (e) {
    yield put(fetchUsersError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchUsersApi.cancel);
    }
  }
}

export function* fetchUsersSaga() {
  yield takeLatest(fetchUsersRequest.toString(), fetchUsers);
}

function* updateUsers({ payload }) {
  try {
    const { data, isError } = yield call(updateUsersApi.run, payload);
    if (isError) throw new Error();
    yield put(updateUsersSuccess({ data }));
  } catch (e) {
    yield put(updateUsersError());
  } finally {
    if (yield cancelled()) {
      yield call(updateUsersApi.cancel);
    }
  }
}

export function* updateUsersSaga() {
  yield takeLatest(updateUsersRequest.toString(), updateUsers);
}
