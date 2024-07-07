export const addProductRequest = (product) => ({
    type: 'ADD_PRODUCT_REQUEST',
    payload: product,
});

export const addProductSuccess = (product) => ({
    type: 'ADD_PRODUCT_SUCCESS',
    payload: product,
});

export const addProductFailure = (error) => ({
    type: 'ADD_PRODUCT_FAILURE',
    payload: error,
});

export const editProductRequest = (product) => ({
    type: 'EDIT_PRODUCT_REQUEST',
    payload: product,
});

export const editProductSuccess = (product) => ({
    type: 'EDIT_PRODUCT_SUCCESS',
    payload: product,
});

export const editProductFailure = (error) => ({
    type: 'EDIT_PRODUCT_FAILURE',
    payload: error,
});

export const deleteProductRequest = (productId) => ({
    type: 'DELETE_PRODUCT_REQUEST',
    payload: productId,
});

export const deleteProductSuccess = (productId) => ({
    type: 'DELETE_PRODUCT_SUCCESS',
    payload: productId,
});

export const deleteProductFailure = (error) => ({
    type: 'DELETE_PRODUCT_FAILURE',
    payload: error,
});
