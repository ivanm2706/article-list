import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  sortQuery: string,
};

const initialState: InitialState = {
  sortQuery: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSortQuery: (state, action: PayloadAction<string>) => {
      state.sortQuery = action.payload;
    },
  },
});

export const {
  setSortQuery,
} = searchSlice.actions;

export default searchSlice.reducer;