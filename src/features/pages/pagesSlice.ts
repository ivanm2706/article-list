import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  page: number,
};

const initialState: InitialState = {
  page: 1,
};

const pagesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    increasePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  increasePage
} = pagesSlice.actions;

export default pagesSlice.reducer;