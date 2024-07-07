import { call, put, takeEvery } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {
    loginSuccess,
    loginFailure,
    registerSuccess,
    registerFailure,
    logoutSuccess,
    logoutFailure,
} from '../actions/authActions';

function* login(action) {
    console.log(`action==>`, action);
    const { email, password } = action.payload;

    yield auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
        })
    // console.log(`data==>`, data);
    yield put(loginSuccess(action.payload));

}


function* register(action) {
    const { email, password } = action.payload;

    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            //
        })
        .catch(error => {
            // yield put(registerFailure(error.message));
        })
    yield put(registerSuccess(action.payload));

}

function* checkAuth() {
    try {
        const user = auth().onAuthStateChanged((resp) => {
            return resp;
        });
        console.log(`user==>`, user);
        if (user) {
            yield put(loginSuccess(user));
        } else {
            yield put(loginFailure('No user logged in'));
        }
    } catch (error) {
        yield put(loginFailure(error.message));
    }
}

function* logout() {
    try {
        auth()
            .signOut()
            .then((resp) => {
                // navigation.navigate('login');
                console.log('User signed out!', resp)
            });
        yield put(logoutSuccess());
    } catch (error) {
        yield put(logoutFailure(error.message));
    }
}

// Watcher Saga
function* authSaga() {
    yield takeEvery('LOGIN_REQUEST', login);
    yield takeEvery('REGISTER_REQUEST', register);
    yield takeEvery('CHECK_AUTH_STATUS', checkAuth);
    yield takeEvery('LOGOUT_REQUEST', logout);
}

export default authSaga;
