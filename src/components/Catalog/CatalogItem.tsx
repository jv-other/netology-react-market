import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProductItemType } from "../../types";
import { toMoney } from "../../utils";

/**
 * Элемент каталога товаров
 * @component
 *
 * @prop {ProductItemType} data Данные товара
 */
export const CatalogItem: FC<{ data: ProductItemType }> = ({ data }) => {
  const {
    id, price, title, images
  } = data;
  const [image] = images;

  return (
    <div className="card catalog-item-card">
      <img className="card-img-top img-fluid" src={image} alt={title} />

      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{toMoney(price)}</p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
};

export default CatalogItem;
