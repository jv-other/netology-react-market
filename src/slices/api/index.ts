import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RequestCallType, RequestErrorType, RequestResponseType, RequestSliceState, RequestStatus
} from "./types";

const slice = createSlice({
  name: "api",
  initialState: {} as RequestSliceState,
  reducers: {
    /**
     * Создать запрос
     * @param state Состояние
     * @param { payload: RequestCallType } action Запрос
     */
    request: (state, { payload }: PayloadAction<RequestCallType>) => {
      const { resource } = payload;
      state[resource] = { resource, status: RequestStatus.PENDING };
    },
    /**
     * Успешное выполнение запроса
     * @param state Состояние
     * @param { payload: RequestResponseType } action Ответ
     */
    success: (state, { payload }: PayloadAction<RequestResponseType>) => {
      const { resource, data } = payload;
      state[resource] = {
        resource, data, status: RequestStatus.SUCCESS
      };
    },
    /**
     * Ошибка запроса
     * @param state Состояние
     * @param { payload: RequestErrorType } action Ошибка
     */
    error: (state, { payload }: PayloadAction<RequestErrorType>) => {
      const { resource, statusCode, message } = payload;
      state[resource] = {
        resource,
        status: RequestStatus.FAILURE,
        error: { statusCode, message }
      };
    },
    /**
     * Сбросить данные запроса
     * @param state Состояние
     * @param { payload: string } action API ресурс
     */
    reset: (state, { payload }: PayloadAction<string>) => {
      const { [payload]: ignore, ...newState } = state;
      return newState;
    }
  }
});

export const {
  request, success, error, reset
} = slice.actions;
export const apiRequestReducer = slice.reducer;

/**
 * Селектор запроса хитов продаж
 */
export const selectRequestTopSales = (state: any) => state.api["top-sales"];

/**
 * Селектор запроса категорий
 */
export const selectRequestCategories = (state: any) => state.api.categories;

/**
 * Селектор запроса списка товаров
 */
export const selectRequestItems = (state: any) => state.api.items;

/**
 * Селектор запроса оформления заказа
 */
export const selectRequestCreateOrder = (state: any) => state.api.order;
