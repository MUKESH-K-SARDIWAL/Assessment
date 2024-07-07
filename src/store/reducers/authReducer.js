const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
        case 'CHECK_AUTH_STATUS':
            return { ...state, loading: true };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload, loading: false };
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
            return { ...state, error: action.payload, loading: false, isAuthenticated: false };
        case 'LOGOUT_REQUEST':
            return { ...state, loading: true };
        case 'LOGOUT_SUCCESS':
            return { ...state, isAuthenticated: false, user: null, loading: false };
        case 'LOGOUT_FAILURE':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default authReducer;
