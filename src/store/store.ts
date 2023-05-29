import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../features/articles/articlesSlice';
import searchReduser from '../features/search/searchSlice';
import sortReduser from '../features/sort/sortSlice';
import pagesReduser from '../features/pages/pagesSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    search: searchReduser,
    sort: sortReduser,
    pages: pagesReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;