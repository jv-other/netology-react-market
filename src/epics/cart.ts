import { ofType } from "redux-observable";
import {
  delay, filter, map, Observable, of, switchMap, tap
} from "rxjs";
import {
  clear, error, fold, remove, reset, success
} from "../slices";

/**
 * Задержка показа сообещения
 * @constant
 */
const SHOW_RESULT_DELAY = 3000;

/**
 * Сохранение позиций корзины в localStorage
 * @function
 */
export const handleCartChangeEpic = (action$: Observable<any>, state$: any) => action$.pipe(
  ofType(fold.type, remove.type, clear.type),
  map(() => state$),
  map((state) => state.value.cart.items),
  tap((items) => window.localStorage.setItem("cartItems", JSON.stringify(items))),
  filter(() => false)
);

/**
 * Очистка результатов запроса оформления заказа
 * @function
 */
export const handleCartOrderEpic = (action$: Observable<any>) => action$.pipe(
  ofType(success.type, error.type),
  map((action) => action.payload),
  filter((response) => response.resource === "order"),
  switchMap(() => of(reset("order")).pipe(
    delay(SHOW_RESULT_DELAY)
  ))
);

/**
 * Очистка корзины после успешного оформления заказа
 * @function
 */
export const handleCartClearEpic = (action$: Observable<any>) => action$.pipe(
  ofType(success.type),
  map((action) => action.payload),
  filter((response) => response.resource === "order"),
  map(() => clear())
);
