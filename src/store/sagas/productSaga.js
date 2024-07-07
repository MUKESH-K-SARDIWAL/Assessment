import { call, put, takeEvery } from 'redux-saga/effects';
import {
    addProductSuccess,
    addProductFailure,
    editProductSuccess,
    editProductFailure,
    deleteProductSuccess,
    deleteProductFailure,
} from '../actions/productActions';
import firestore from '@react-native-firebase/firestore';


function* addProduct(action) {
    try {
        const productRef = firestore().collection('products').add(action.payload)
            .then((resp) => {
                console.log('resp', resp)
            });
       
        yield put(addProductSuccess({ ...product, id: productRef.id }));
    } catch (error) {
        yield put(addProductFailure(error.message));
    }
}

function* editProduct(action) {
    try {
        const productRef = firestore().collection('products').doc(action.payload?.id);
        
        yield put(editProductSuccess(product));
    } catch (error) {
        yield put(editProductFailure(error.message));
    }
}

function* deleteProduct(action) {
    try {
        const { productId } = action.payload;
        const productRef = firestore().collection('products').doc(productId);
        yield put(deleteProductSuccess(productId));
    } catch (error) {
        yield put(deleteProductFailure(error.message));
    }
}

function* productSaga() {
    yield takeEvery('ADD_PRODUCT_REQUEST', addProduct);
    yield takeEvery('EDIT_PRODUCT_REQUEST', editProduct);
    yield takeEvery('DELETE_PRODUCT_REQUEST', deleteProduct);
}

export default productSaga;
