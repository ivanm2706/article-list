import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../types/Article';
import { fetchArticle } from '../../utils/fetch';
import { generateId } from '../../utils/generateId';
import { isEqual } from '../../utils/isEqual';

type InitialState = {
  customArticles: Article[],
  articles: Article[],
  isLoading: boolean,
  error: string,
  pinnedArticleId: null | string,
  showMore: boolean,
  newSetArticles: boolean,
};

const initialState: InitialState = {
  customArticles: [],
  articles: [],
  isLoading: false,
  error: '',
  pinnedArticleId: null,
  showMore: false,
  newSetArticles: false,
};

export const fetchArticlesThunk = createAsyncThunk(
  'articles/fetchArticles', 
  async ({ query, page }: { query: string, page: number }) => {
    try {
      const response = await fetchArticle(query, page);

      if (!response) {
        throw new Error('cannot load');
      }

      if (response) {
        const dataWithIdHash = response.map(item => {
          item.id = generateId(item.description + item.title);

          return item;
        });

        return dataWithIdHash;
      }

      return response;
    } catch {
      throw new Error('error');
    }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<Article>) => {
      state.customArticles.unshift(action.payload);
      state.articles.unshift(action.payload);
    },
    removeArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(
        article => article.id !== action.payload
      );
    },
    pinArticle: (state, action: PayloadAction<string>) => {
      if (state.pinnedArticleId === action.payload) {
        state.pinnedArticleId = null;

        return;
      }

      state.pinnedArticleId = action.payload;
    },
    setNewSetArticles: (state, action: PayloadAction<boolean>) => {
      state.newSetArticles = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action: PayloadAction<Article[] | undefined>) => {
        state.isLoading = false;

        if (!action.payload || !action.payload.length) {
          state.showMore = false;

          return;
        }

        if (state.newSetArticles) {
          state.articles = [];
        }

        const iqualData = isEqual([...state.customArticles, ...state.articles, ...action.payload]);
        
        state.articles = iqualData;
        state.showMore = true;
      })
      .addCase(fetchArticlesThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Cannot load articles';
      })
  }
});

export const {
  addArticle,
  removeArticle,
  pinArticle,
  setNewSetArticles
} = articlesSlice.actions;

export default articlesSlice.reducer;