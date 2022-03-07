import React, { FC } from "react";
import { OrderItemType } from "../../types";
import { toMoney } from "../../utils";

/**
 * Список позиций корзины
 * @component
 *
 * @prop {OrderItemType[]} items Список позиций
 * @prop {function} onRemove Callback удаления позиции корзины
 */
export const CartItems: FC<{
  items: OrderItemType[],
  onRemove: (index: number) => void
}> = ({ items, onRemove }) => {
  const sum = items.reduce((acc, item) => acc + (item.count * item.price), 0);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{item.size}</td>
            <td>{item.count}</td>
            <td>{toMoney(item.price)}</td>
            <td>{toMoney(item.price * item.count)}</td>
            <td>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onRemove(index)}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={5} className="text-end">Общая стоимость</td>
          <td>{toMoney(sum)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartItems;
