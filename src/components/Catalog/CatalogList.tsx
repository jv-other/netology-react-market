import React, { FC } from "react";
import { ProductItemType } from "../../types";
import { CatalogItem } from "./CatalogItem";

/**
 * Список товаров
 * @component
 *
 * @prop {ProductItemType[]} data Список данных товаров
 */
export const CatalogList: FC<{ data: ProductItemType[] }> = ({ data }) => (
  <div className="row">
    {data.map((item) => (
      <div key={item.id} className="col-4">
        <CatalogItem data={item} />
      </div>
    ))}
  </div>
);

export default CatalogList;
