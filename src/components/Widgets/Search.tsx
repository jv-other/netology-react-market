import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search } from "../../slices";

/**
 * Виджет поиска
 * @component
 */
export const SearchWidget = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    setVisible((prevVisible) => !prevVisible);
    if (visible && value) {
      dispatch(search(value));
      navigate("/catalog");
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.value);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <div
        className="header-controls-pic header-controls-search"
        onClick={handleClick}
        role="link"
        tabIndex={-1}
      />
      {visible && (
        <form className="header-controls-search-form form-inline">
          <input
            className="form-control"
            placeholder="Поиск"
            value={value}
            onChange={handleChange}
          />
        </form>
      )}
    </>
  );
};

export default SearchWidget;
