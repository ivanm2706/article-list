import React from 'react'
import { fetchArticlesThunk, setNewSetArticles } from '../features/articles/articlesSlice';
import { increasePage } from '../features/pages/pagesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

function ShowMore() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector(state => state.search);
  const { page } = useAppSelector(state => state.pages);

  const showMoreArticles = async () => {
    const newPage = page + 1;

    await dispatch(increasePage(newPage));
    await dispatch(setNewSetArticles(false));
    await dispatch(fetchArticlesThunk({ query: searchQuery, page: newPage }));
  }

  return (
    <>
      <button
        className="button button--showMore"
        onClick={showMoreArticles}
      >
        Show more articles
      </button>
    </>
  )
}

export default ShowMore
