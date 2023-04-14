import { configureStore } from '@reduxjs/toolkit';
import { productAPI } from 'redux/api/api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import productSlice from 'redux/slices/productSlice';
import searchSlice from 'redux/slices/searchSlice';

export const store = configureStore({
  reducer: {
    productSlice: productSlice,
    searchSlice: searchSlice,
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
