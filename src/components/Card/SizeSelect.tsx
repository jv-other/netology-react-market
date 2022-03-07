import React, { FC } from "react";
import { SizeType } from "../../types";

/**
 * Компонент выбора размера
 * @component
 *
 * @prop {SizeType[]} sizes Возможные размеры
 * @prop {string} selected Выбранный размер
 * @prop {function} onSelect Callback выбора размера
 */
export const SizeSelect: FC<{
  sizes: SizeType[],
  selected: string,
  onSelect: (size: string) => any
}> = ({ sizes, selected, onSelect }) => (
  <>
    {sizes.filter(({ avalible }) => avalible).map(({ size }, index) => (
      <span
        key={index}
        className={`catalog-item-size${selected === size ? " selected" : ""}`}
        onClick={() => onSelect(size)}
        role="option"
        aria-selected={selected === size}
        tabIndex={index}
      >
        {size}
      </span>
    ))}
  </>
);

export default SizeSelect;
