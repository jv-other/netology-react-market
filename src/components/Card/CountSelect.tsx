import React, { FC } from "react";

/**
 * Компонент выбора количества товара
 * @component
 *
 * @prop {number} count Текущее значение количества
 * @prop {function} onChange Callback изменения количества товара
 */
export const CountSelect: FC<{
  count: number,
  onChange: (count: number) => any
}> = ({ count, onChange }) => (
  <span className="btn-group btn-group-sm ps-2">
    <button type="button" className="btn btn-secondary" onClick={() => onChange(-1)}>-</button>
    <span className="btn btn-outline-primary">{count}</span>
    <button type="button" className="btn btn-secondary" onClick={() => onChange(1)}>+</button>
  </span>
);

export default CountSelect;
