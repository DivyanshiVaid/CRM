import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: false,
    currentProduct: {},
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // set all products fetched from api
        setProductData: (state, action) => {
            return {
                ...state,
                products: action.payload,
            };
        },

        // add single product in redux
        productAdded(state, action) {
            state?.products.push(action.payload);
        },

        // update single product in redux
        productUpdated(state, action) {
            const { id, ...updatedProduct } = action.payload;
            const existingProductId = state.products.findIndex(product => product.id === id);
            if (existingProductId !== -1) {
                state.products[existingProductId] = { ...state.products[existingProductId], ...updatedProduct };
            }
        },

        // delete product from redux
        productDeleted(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        },

        // fetch single product from api
        setSingleProduct(state, action) {
            state.currentProduct = action.payload
        },

        // loading state 
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setProductData, setLoading, productAdded, productUpdated, productDeleted, setSingleProduct } = productSlice.actions;

export default productSlice.reducer;
