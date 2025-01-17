import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import productSaga from './productSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        productSaga()
        // other sagas can go here
    ]);
}
