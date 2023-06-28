import { takeLatest, call, put, cancelled } from 'redux-saga/effects';

import { fetchHeadingsApi } from '../api';
import { headingsRequest, headingsSuccess, headingsError } from '../slices/headings';

function* fetchHeadings() {
    try {
        const { data, isError } = yield call(fetchHeadingsApi.run);
        if(isError) throw new Error();
        yield put(headingsSuccess({ data }));
    } catch (e) {
        yield put(headingsError());
    } finally {
        if(yield cancelled()) {
            yield call(fetchHeadingsApi.cancel);
        }
    }
}

export function* fetchHeadingsSaga() {
    yield takeLatest(headingsRequest.toString(), fetchHeadings);
}