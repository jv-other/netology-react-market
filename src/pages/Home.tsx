import React from "react";
import { Categories } from "../components/Categories";
import { CatalogList, CatalogMore } from "../components/Catalog";
import { withDataLoader } from "../hocs/withDataLoader";
import {
  getCategories, getTopSales, queryItems, selectCatalogCategory, selectCatalogItems,
  selectCatalogSearch, selectRequestCategories, selectRequestTopSales
} from "../slices";

/**
 * Хиты продаж
 */
const TopSales = withDataLoader(
  CatalogList,
  () => () => getTopSales(),
  () => selectRequestTopSales
);

/**
 * Меню категорий
 */
const CategoriesMenu = withDataLoader(
  Categories,
  () => () => getCategories(),
  () => selectRequestCategories
);

/**
 * Каталог товаров
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
 * Домашняя страница
 */
export const HomePage = () => (
  <>
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж</h2>
      <TopSales />
    </section>
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <CategoriesMenu />
      <Catalog />
      <CatalogMore />
    </section>
  </>
);

export default HomePage;
