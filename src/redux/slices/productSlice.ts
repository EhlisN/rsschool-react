import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from 'components/interfaces/IProducts';

const stateProducts: IProduct[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState: stateProducts,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
