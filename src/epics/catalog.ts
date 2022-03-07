import { ofType } from "redux-observable";
import {
  debounceTime, EMPTY, filter, map, Observable, of, switchMap
} from "rxjs";
import {
  append, category, clean, loadMoreItems, queryItems, queryMoreItems, request, search,
  selectCatalogCategory, selectCatalogSearch, set, success
} from "../slices";

/**
 * Обработка изменения строки поиска в каталоге
 */
export const handleChangeSearchEpic = (action$: Observable<any>, state$: any) => action$.pipe(
  ofType(search.type),
  debounceTime(300),
  map((action) => action.payload),
  switchMap((searchVal) => of(queryItems(searchVal, selectCatalogCategory(state$.value))))
);

/**
 * Обработка изменения выбранной категории
 */
export const handleChangeCategoryEpic = (action$: Observable<any>, state$: any) => action$.pipe(
  ofType(category.type),
  debounceTime(300),
  map((action) => action.payload),
  switchMap(
    (selectedCategory) => of(queryItems(selectCatalogSearch(state$.value), selectedCategory))
  )
);

/**
 * Сброс записей списка товара
 */
export const handleCleanItemsEpic = (action$: Observable<any>) => action$.pipe(
  ofType(request.type),
  map((action) => action.payload),
  filter((req) => req.resource === "items"),
  switchMap((req) => (req.partial ? EMPTY : of(clean())))
);

/**
 * Загрузка записей списка товаров
 */
export const handleRequestItemsEpic = (action$: Observable<any>) => action$.pipe(
  ofType(success.type),
  map((action) => action.payload),
  filter((response) => response.resource === "items"),
  map((response) => {
    const { partial, data } = response;
    return partial ? append(data) : set(data);
  })
);

/**
 * Дозагрузка записей каталога
 */
export const handleMoreRequestEpic = (action$: Observable<any>, state$: any) => action$.pipe(
  ofType(loadMoreItems.type),
  map(() => state$.value.catalog),
  map((catalog) => queryMoreItems(catalog.items.length, catalog.search, catalog.category))
);
