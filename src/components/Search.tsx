import classNames from "classnames";
import React from "react";
import { fetchArticlesThunk, setNewSetArticles } from "../features/articles/articlesSlice";
import { increasePage } from "../features/pages/pagesSlice";
import { setEmptySearch, setSearchQuery } from "../features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

function Search() {
  const dispatch = useAppDispatch();
  const { searchQuery, searchIsEmpty } = useAppSelector(
    (state) => state.search
  );

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const hendlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery) {
      dispatch(setEmptySearch(true));

      return;
    }

    const firstPage = 1;

    await dispatch(increasePage(firstPage));
    await dispatch(setNewSetArticles(true));
    await dispatch(fetchArticlesThunk({ query: searchQuery, page: firstPage }));
  };

  return (
    <div className="search header__search">
      <div
        className={classNames({
          'search__container': true,
          'search__container--dangerous': searchIsEmpty,
        })}
      >
        <form onSubmit={hendlerSubmit}>
          <input
            type="text"
            placeholder="Search articles by topic..."
            value={searchQuery}
            onChange={handlerSearch}
            className={classNames({
              'search__input': true,
              'search__input--dangerous': searchIsEmpty,
            })}
          />

          <button className="button button--search" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Search;
