import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product.slice';

export  const store = configureStore({
  reducer: {
    products: productReducer,
    // Add reducers for other slices if needed
  },
});
export default store;