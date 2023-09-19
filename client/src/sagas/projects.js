import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { router } from "../components/routes";
import { fetchProjectsApi, insertProjectApi } from "../api/projects";
import {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsError,
  insertProjectRequest,
  insertProjectSuccess,
  insertProjectError,
} from "../slices/projects";

function* fetchProjects() {
  try {
    const { data, isError } = yield call(fetchProjectsApi.run);
    if (isError) throw new Error();
    yield put(fetchProjectsSuccess({ data }));
  } catch (e) {
    yield put(fetchProjectsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchProjectsApi.cancel);
    }
  }
}

export function* fetchProjectsSaga() {
  yield takeLatest(fetchProjectsRequest.toString(), fetchProjects);
}

function* insertProject({ payload }) {
  try {
    const { data, isError } = yield call(insertProjectApi.run, payload);
    if (isError) throw new Error();
    yield put(insertProjectSuccess({ data }));
    router.navigate(`/proyectos/${data.idProyecto}/registro`);
  } catch (e) {
    yield put(insertProjectError());
  } finally {
    if (yield cancelled()) {
      yield call(insertProjectApi.cancel);
    }
  }
}

export function* insertProjectSaga() {
  yield takeLatest(insertProjectRequest.toString(), insertProject);
}
