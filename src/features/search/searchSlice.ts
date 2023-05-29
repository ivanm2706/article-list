import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  searchQuery: string,
  searchIsEmpty: boolean,
};

const initialState: InitialState = {
  searchQuery: '',
  searchIsEmpty: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setEmptySearch: (state, action: PayloadAction<boolean>) => {
      state.searchIsEmpty = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.searchIsEmpty = false;
    },
  },
});

export const {
  setSearchQuery,
  setEmptySearch,
} = searchSlice.actions;

export default searchSlice.reducer;