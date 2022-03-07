/* eslint-disable no-param-reassign */
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItemType } from "../types";
import { RequestState, RequestStatus } from "./api/types";

/**
 * Каталог товаров
 * @type
 */
export type CatalogSliceState = {
  /** Список товаров */
  items: ProductItemType[];
  /** Идентификатор выбранной категории */
  category: number;
  /** Поисковая строка  */
  search: string;
  /** Признак доступности других записей */
  hasMore: boolean;
};

/**
 * Начальное состояние
 */
const initialState: CatalogSliceState = {
  items: [],
  category: 0,
  search: "",
  hasMore: true
};

const slice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    /**
     * Изменение строки поиска
     * @param state Состояние
     * @param { payload: string } action Значение строки поиска
     */
    search: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    /**
     * Выбор категории
     * @param state Состояние
     * @param { payload: number } action Значение идентификатора выбранной категории
     */
    category: (state, { payload }: PayloadAction<number>) => {
      state.category = payload;
    },
    /**
     * Добавить записи каталога товаров в список
     * @param state Состояние
     * @param { payload: ProductItemType[]} action Список товаров
     */
    append: (state, { payload }: PayloadAction<ProductItemType[]>) => {
      state.items = [...state.items, ...payload];
      state.hasMore = (payload.length > 5);
    },
    /**
     * Список товаров
     * @param state Состояние
     * @param { payload: ProductItemType[]} action Список товаров
     */
    set: (state, { payload }: PayloadAction<ProductItemType[]>) => {
      state.items = payload;
      state.hasMore = (payload.length > 5);
    },
    /**
     * Сбросить список товаров
     * @param state Состояние
     */
    clean: (state) => {
      state.items = [];
      state.hasMore = true;
    }
  }
});

export const {
  search, category, set, append, clean
} = slice.actions;
export const catalogReducer = slice.reducer;

/**
 * Дозагрузка записей
 */
export const loadMoreItems = createAction("loadMoreItems");

/**
 * Селектор выбранной категории
 */
export const selectCatalogCategory = (state: any) => state.catalog.category;

/**
 * Селектор поисковой строки
 */
export const selectCatalogSearch = (state: any) => state.catalog.search;

/**
 * Селектор списка товаров
 */
export const selectCatalogItems = (state: any): RequestState => ({
  data: state.catalog.items,
  status: RequestStatus.SUCCESS,
  resource: "catalog"
});

/**
 * Селектор признака возможности дозагрузки записей
 */
export const selectCatalogHasMore = (state: any) => state.catalog.hasMore;
