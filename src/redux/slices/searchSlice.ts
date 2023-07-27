import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stateSearch = {
  stateSearch: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: stateSearch,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.stateSearch = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
