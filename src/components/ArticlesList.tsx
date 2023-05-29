import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import ArticlesItem from './ArticlesItem';
import ShowMore from './ShowMore';
import Sort from './Sort';

const ArticlesList = () => {
  const {
    articles,
    pinnedArticleId,
    showMore,
    error,
    isLoading
  } = useAppSelector(state => state.articles);

  const { sortQuery } = useAppSelector(
    (state) => state.sort
  );

  const pinnedArticle = articles.find(article => article.id === pinnedArticleId);
  const sortedArticles = articles.filter(item => {
    return item.title.toLowerCase().includes(sortQuery.toLowerCase()) 
      || item.description.toLowerCase().includes(sortQuery.toLowerCase());
  })

  return (
    <div className="section">
      <div className="container">
        <h1>Articles List</h1>

        {error && (
          <div>
            {error}
          </div>
        )}

        {!!sortedArticles.length && (
          <>
            <Sort />

            <div className="articles">
              {pinnedArticle && (
                <ArticlesItem article={pinnedArticle} />
              )}
              {sortedArticles.map(article => (
                <ArticlesItem key={article.id} article={article} />
              ))}
            </div>
          </>
        )}

        {isLoading && (
          <div className="loader" />
        )}

        {showMore && !isLoading && (
          <ShowMore />
        )}
      </div>
    </div>
  );
};

export default ArticlesList;