import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryType } from "../../types";
import { category, selectCatalogCategory } from "../../slices";

import "./Categories.css";

/**
 * Категории
 * @component
 *
 * @prop {CategoryType[]} data Список категорий
 */
export const Categories: FC<{ data: CategoryType[] }> = ({ data }) => {
  const dispatch = useDispatch();

  const selected = useSelector(selectCatalogCategory);
  const categories = [{ id: 0, title: "Все" }, ...data];

  const handleSelect = (id: number) => dispatch(category(id));

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map((item, index) => (
        <li
          key={item.id}
          className="nav-item"
          onClick={() => handleSelect(item.id)}
          role="menuitem"
          tabIndex={index}
        >
          <a
            href="#/"
            title={item.title}
            className={`nav-link${selected === item.id ? " active" : ""}`}
            onClick={(event) => event.preventDefault()}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
