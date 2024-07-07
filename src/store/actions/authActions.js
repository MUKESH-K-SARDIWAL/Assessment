export const loginRequest = (credentials) => ({
    type: 'LOGIN_REQUEST',
    payload: credentials,
});

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const registerRequest = (credentials) => ({
    type: 'REGISTER_REQUEST',
    payload: credentials,
});

export const registerSuccess = (user) => ({
    type: 'REGISTER_SUCCESS',
    payload: user,
});

export const registerFailure = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error,
});

export const checkAuthStatus = () => ({
    type: 'CHECK_AUTH_STATUS',
});

export const logoutRequest = () => ({
    type: 'LOGOUT_REQUEST',
});

export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
});

export const logoutFailure = (error) => ({
    type: 'LOGOUT_FAILURE',
    payload: error,
});
