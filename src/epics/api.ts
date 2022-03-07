/* eslint-disable no-console */
import { ofType } from "redux-observable";
import {
  catchError, concatMap, delay, filter, map, Observable, of, retryWhen, switchMap
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  error, request, success, RequestError, RequestErrorType, RequestCallType, RequestResponseType
} from "../slices";

/**
 * API URL
 * @constant
 */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Таймаут повтора запроса в случае ошибки
 * @constant
 */
const RETRY_DELAY = 1000;

/**
 * Обработка ошибки
 * @function
 * @param resource API ресурс
 */
const errorHandler = (resource: string) => (err: any): RequestErrorType => {
  if (error instanceof RequestError) {
    console.error(err);
    return error;
  }
  if (err instanceof Error) {
    console.error(err);
    return { resource, message: err.message };
  }
  return { resource, message: "Что-то пошло не так.." };
};

/**
 * API запрос
 * @function
 * @param req Данные запроса
 */
const fromApiCall = (req: RequestCallType): Observable<RequestResponseType> => {
  const {
    resource, params, options, partial
  } = req;
  return fromFetch(`${API_URL}/${resource}${params || ""}`, options).pipe(
    switchMap((response: Response): Promise<any> => {
      if (!response.ok) {
        throw new RequestError(resource, response.status, response.statusText);
      }
      return (response.status !== 204) ? response.json() : new Promise((resolve) => {
        resolve(null);
      });
    }),
    map((data: any) => ({ resource, data, partial }))
  );
};

/**
 * Общая обработка GET запросов
 * @function
 */
export const handleRequestEpic = (action$: Observable<any>) => action$.pipe(
  ofType(request.type),
  map((action) => action.payload),
  filter((req) => !["order", "items"].includes(req.resource)),
  concatMap((req) => fromApiCall(req).pipe(
    map((response) => success(response)),
    retryWhen((errors) => errors.pipe(
      map(errorHandler(req.resource)),
      delay(RETRY_DELAY)
    ))
  ))
);

/**
 * Обработка запроса списка товаров
 * @function
 */
export const handleLoadItemsEpic = (action$: Observable<any>) => action$.pipe(
  ofType(request.type),
  map((action) => action.payload),
  filter((req) => req.resource === "items"),
  switchMap((req) => fromApiCall(req).pipe(
    map((response) => success(response)),
    retryWhen((errors) => errors.pipe(
      map(errorHandler(req.resource)),
      delay(RETRY_DELAY)
    ))
  ))
);

/**
 * Обработка запроса оформления заказов
 * @function
 */
export const handleCreateOrderEpic = (action$: Observable<any>) => action$.pipe(
  ofType(request.type),
  map((action) => action.payload),
  filter((req) => req.resource === "order"),
  switchMap((req) => fromApiCall(req).pipe(
    map((response) => success(response)),
    catchError((e) => of(e).pipe(
      map(errorHandler(req.resource)),
      map((err) => error(err))
    ))
  ))
);
