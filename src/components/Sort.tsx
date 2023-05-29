import classNames from "classnames";
import React from "react";
import { setSortQuery } from "../features/sort/sortSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

function Sort() {
  const dispatch = useAppDispatch();
  const { sortQuery } = useAppSelector(
    (state) => state.sort
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortQuery(e.target.value));
  };

  return (
    <div className="sort">
      <label>
        Sort by: 
        <input
          type="text"
          placeholder="Sort by..."
          value={sortQuery}
          onChange={handleSearch}
          className={classNames({
            'sort__input': true,
          })}
        />
      </label>
    </div>
  );
}

export default Sort;
