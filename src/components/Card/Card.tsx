import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fold, selectCartItem } from "../../slices";
import { ProductPropertiesNames, ProductType } from "../../types";
import { CountSelect } from "./CountSelect";
import { SizeSelect } from "./SizeSelect";

import "./Card.css";
import { Message } from "../Notice";

/**
 * Названия атрибутов товара
 * @constant
 */
const properties: ProductPropertiesNames = {
  sku: "Артикул",
  manufacturer: "Производитель",
  color: "Цвет",
  material: "Материал",
  season: "Сезон",
  reason: "Повод"
};

/**
 * Таймаут сообщения
 */
const NOTIFY_TIMEOUT = 1000;

/**
 * Карточка товара
 *
 * @prop {ProductType} Данные товара
 */
export const Card: FC<{ data: ProductType }> = ({ data }) => {
  const item = useSelector(selectCartItem(data.id));
  const [size, setSize] = useState<string>(item?.size || "");
  const [count, setCount] = useState<number>(item?.count || 1);
  const [notify, setNotify] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    id, price, title, images, sizes
  } = data;
  const [image] = images;

  useEffect(() => {
    if (notify) {
      setTimeout(() => setNotify(false), NOTIFY_TIMEOUT);
    }
  }, [notify]);

  const handleChangeCount = (delta: number) => setCount((prevCount) => {
    const newCount = prevCount + delta;
    return Math.max(1, Math.min(10, newCount));
  });

  const handleClick = () => count && size && dispatch(fold({
    id, title, price, size, count
  })) && setNotify(true);

  return (
    <>
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={image} className="img-fluid" alt={title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              {Object.entries(properties).map(([property, name], index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{(data as any)[property]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии:&nbsp;
              <SizeSelect sizes={sizes} selected={size} onSelect={(value) => setSize(value)} />
            </p>
            <p>
              Количество:&nbsp;
              <CountSelect count={count} onChange={handleChangeCount} />
            </p>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-block btn-lg"
            onClick={handleClick}
            disabled={!size}
          >
            В корзину
          </button>
          {notify && (
            <Message message="Товар добавлен в корзину!" level="info" />
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
