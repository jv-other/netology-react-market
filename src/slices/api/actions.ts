import { createAction } from "@reduxjs/toolkit";
import { OrderType } from "../../types";
import { request } from "./index";
import { ItemsQueryType, RequestCallType } from "./types";

/**
 * Хиты продаж
 */
export const getTopSales = createAction(request.type, () => ({
  payload: { resource: "top-sales" }
}));

/**
 * Категории
 */
export const getCategories = createAction(request.type, () => ({
  payload: { resource: "categories" }
}));

const getQueryParams = (params: ItemsQueryType): RequestCallType => ({
  resource: "items",
  partial: !!params.offset,
  // eslint-disable-next-line prefer-template
  params: "?" + Object
    .entries(params)
    .filter(([, val]) => val)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join("&")
});

/**
 * Запрос списка товаров
 */
export const queryItems = createAction(request.type, (search?: string, category?: number) => ({
  payload: getQueryParams({ q: search, categoryId: category })
}));

/**
 * Запрос списка товаров со смещением
 */
export const queryMoreItems = createAction(request.type, (
  offset: number,
  search?: string,
  category?: number
) => ({
  payload: getQueryParams({ offset, q: search, categoryId: category })
}));

/**
 * Запрос детальных данных товара
 */
export const getItem = createAction(request.type, (id: number) => ({
  payload: { resource: `items/${id}` }
}));

/**
 * Оформить заказ
 */
export const createOrder = createAction(request.type, (order: OrderType) => ({
  payload: {
    resource: "order",
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    }
  }
}));
