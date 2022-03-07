import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCatalogSearch, search } from "../../slices";

import "./Search.css";

/**
 * Строка поиска
 * @component
 */
export const Search = () => {
  const value = useSelector(selectCatalogSearch);
  const dispatch = useDispatch();

  const handleChange = (
    { target }: ChangeEvent<HTMLInputElement>
  ) => dispatch(search(target.value));

  return (
    <form className="catalog-search-form form-inline">
      <input
        className="form-control"
        placeholder="Поиск"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
