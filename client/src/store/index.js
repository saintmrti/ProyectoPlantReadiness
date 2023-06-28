import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import reducer from '../slices';
import initSagas from '../initSagas';
// import tokenMiddleware from '../middleware/tokenMiddleware';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware]
});

initSagas(sagaMiddleware);