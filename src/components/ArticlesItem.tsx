import classNames from 'classnames';
import React from 'react'
import { pinArticle, removeArticle } from '../features/articles/articlesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Article } from '../types/Article'

type Props = {
  article: Article,
}

const ArticlesItem: React.FC<Props> = ({ article }) => {
  const dispatch = useAppDispatch();
  const {
    pinnedArticleId,
  } = useAppSelector(state => state.articles);

  const handleRemove = (id: string) => {
    dispatch(removeArticle(id));
  };

  const handlePin = (id: string) => {
    dispatch(pinArticle(id));
  };

  return (
    <div className={classNames({
      'articles__item': true,
      'articles__item--pinned': pinnedArticleId === article.id,
    })} >
      <div className="articles__img">
        <img src={article.urlToImage} alt="Article" />
      </div>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>Author: {article.author}</p>
      {article?.customArticle && (
        <button
        className="button button--remove"
          onClick={() => handleRemove(article.id)}
        >
          Remove
        </button>
      )}
      
      <button
        className={classNames({
          'button button--pin': true,
          'button--pinned': pinnedArticleId === article.id,
        })}
        onClick={() => handlePin(article.id)}
      />
    </div>
  )
}

export default ArticlesItem
