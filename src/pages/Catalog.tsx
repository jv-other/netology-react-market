import React from "react";
import { Categories } from "../components/Categories";
import { CatalogList, CatalogMore } from "../components/Catalog";
import { Search } from "../components/Search";
import { withDataLoader } from "../hocs/withDataLoader";
import {
  queryItems, getCategories, selectCatalogSearch, selectCatalogCategory,
  selectCatalogItems, selectRequestCategories
} from "../slices";

/**
 * Компонент списка товаров
 */
const Catalog = withDataLoader(
  CatalogList,
  () => (state) => queryItems(
    selectCatalogSearch(state),
    selectCatalogCategory(state)
  ),
  () => selectCatalogItems
);

/**
 * Меню выбора категорий
 */
const CategoriesMenu = withDataLoader(
  Categories,
  () => () => getCategories(),
  () => selectRequestCategories
);

/**
 * Страница каталога
 */
export const CatalogPage = () => (
  <section className="catalog">
    <h2 className="text-center">Каталог</h2>
    <CategoriesMenu />
    <Search />
    <Catalog />
    <CatalogMore />
  </section>
);

export default CatalogPage;
