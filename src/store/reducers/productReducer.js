const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productReducer = (state = initialState, action) => {
   console.log(` action.payload==>`, action.payload);
    switch (action.type) {
        case 'ADD_PRODUCT_REQUEST':
        case 'EDIT_PRODUCT_REQUEST':
        case 'DELETE_PRODUCT_REQUEST':
            return { ...state, loading: true };
        case 'ADD_PRODUCT_SUCCESS':
            return {
                ...state,
                products: [...state.products, action.payload],
                loading: false,
            };
        case 'EDIT_PRODUCT_SUCCESS':
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                ),
                loading: false,
            };
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
                loading: false,
            };
        case 'ADD_PRODUCT_FAILURE':
        case 'EDIT_PRODUCT_FAILURE':
        case 'DELETE_PRODUCT_FAILURE':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default productReducer;
