import classNames from "classnames";
import React, { useState } from "react";
import { addArticle } from "../features/articles/articlesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Article } from "../types/Article";
import { generateId } from "../utils/generateId";

function AddArticle() {
  const [isModal, setIsModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(state => state.articles);

  const showModal = () => {
    setIsModal(true);
  };

  const addNewArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { children } = e.target as HTMLFormElement;
    const author = children[0].children[0] as HTMLInputElement;
    const title = children[1].children[0] as HTMLInputElement;
    const description = children[2].children[0] as HTMLTextAreaElement;
    const urlToImage = children[3].children[0] as HTMLInputElement;

    const id = generateId(title.value + description.value);

    if (articles.some(a => a.id === id)) {
      setIsError(true);

      return;
    }

    const newArticle: Article = {
      urlToImage: urlToImage.value,
      author: author.value,
      title: title.value,
      description: description.value,
      id,
      customArticle: true,
    };
    
    dispatch(addArticle(newArticle));
    setIsModal(false);
    setIsError(false);
  };

  return (
    <div>
      {isModal && <div className="modal-open"></div>}

      <button
        type="button"
        className="button button--add"
        onClick={showModal}
      >
        Add article
      </button>

      {isModal && (
        <div
          className={classNames({
            'modal': true,
            'modal--dangerous': isError,
          })}
        >
          <h2>New Article</h2>

          <form onSubmit={addNewArticle} className="form">
            <label>
              Author
              <input onChange={() => setIsError(false)} type="text" placeholder="Enter name..." required />
            </label>

            <label>
              Title
              <input onChange={() => setIsError(false)} type="text" placeholder="Enter title..." required />
            </label>

            <label>
                Description
              <textarea onChange={() => setIsError(false)} placeholder="Enter description..." required />
            </label>

            <label>
              Image
              <input onChange={() => setIsError(false)} type="text" placeholder="Enter src..." required />
            </label>
            <button
              type="submit"
              className="button button--submit"
            >
              submit
            </button>
          </form>
          <button
            type="button"
            className="button button--cross"
            onClick={() => setIsModal(false)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default AddArticle;
