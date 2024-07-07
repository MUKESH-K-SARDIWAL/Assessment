import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    // other reducers can go here
});

export default rootReducer;
