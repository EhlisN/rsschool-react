import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPerson } from 'components/interfaces/IPerson';

const statePerson: IPerson[] = [];

const personSlice = createSlice({
  name: 'person',
  initialState: statePerson,
  reducers: {
    addPerson(state, action: PayloadAction<IPerson>) {
      state.push(action.payload);
    },
  },
});

export const { addPerson } = personSlice.actions;
export default personSlice.reducer;
