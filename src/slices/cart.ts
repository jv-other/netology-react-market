/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItemType } from "../types";

/**
 * Cart Slice
 * @type
 */
export type CartSliceState = {
  /** Позиции */
  items: OrderItemType[];
};

/**
 * Загрузка позиций из localStorage
 * @function
 */
const loadState = (): OrderItemType[] => {
  try {
    return JSON.parse(window.localStorage.getItem("cartItems") || "[]");
  } catch (ignore) {
    return [];
  }
};

/**
 * Инициализация состояния
 */
const initialState: CartSliceState = {
  items: loadState()
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Добавить/Изменить позицию в корзине
     * @param state Состояние
     * @param { payload: OrderItemType } action Данные позиции
     */
    fold: (state, { payload }: PayloadAction<OrderItemType>) => {
      const found = state.items.find((item) => (
        (payload.id === item.id) && (payload.size === item.size)
      ));
      if (found) {
        found.count = payload.count;
        found.price = payload.price;
      } else {
        state.items = [...state.items, payload];
      }
    },
    /**
     * Удалить позицию из корзины
     * @param state Состояние
     * @param { payload: number } action Индекс позиции в корзине
     */
    remove: (state, { payload }: PayloadAction<number>) => {
      state.items = state.items.filter((_, index) => (payload !== index));
    },
    /**
     * Очистить корзину
     * @param state Состояние
     */
    clear: (state) => {
      state.items = [];
    }
  }
});

export const { fold, remove, clear } = slice.actions;
export const cartReducer = slice.reducer;

/**
 * Селектор выбранных позиций
 */
export const selectCartItems = (state: any): OrderItemType[] => state.cart.items;

/**
 * Селектор количества позиций в корзине
 */
export const selectCartSize = (state: any) => state.cart.items.length;

/**
 * Селектор позиции в корзине по идентификатору
 */
export const selectCartItem = (
  id: number
) => (state: any) => state.cart.items.find((item: OrderItemType) => (id === item.id));
