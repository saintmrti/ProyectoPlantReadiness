import { takeLatest, call, put, cancelled } from 'redux-saga/effects';

import { fetchMachinesApi } from '../api';
import { machinesRequest, machinesSuccess, machinesError } from '../slices/machines';

function* fetchMachines() {
    try {
        const { data, isError } = yield call(fetchMachinesApi.run);
        if(isError) throw new Error();
        yield put(machinesSuccess({ data }));
    } catch (e) {
        yield put(machinesError());
    } finally {
        if(yield cancelled()) {
            yield call(fetchMachinesApi.cancel);
        }
    }
}

export function* fetchMachinesSaga() {
    yield takeLatest(machinesRequest.toString(), fetchMachines);
}