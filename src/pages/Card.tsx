import React from "react";
import { useMatch } from "react-router-dom";
import Card from "../components/Card";
import { getItem } from "../slices";
import { withDataLoader } from "../hocs/withDataLoader";

/**
 * Карточка товара
 */
const CardWithData = withDataLoader(
  Card,
  (props: { id: number }) => () => getItem(props.id),
  (props: { id: number }) => (state: any) => state.api[`items/${props.id}`]
);

/**
 * Страница карточки товара
 */
export const CardPage = () => {
  const { params } = useMatch("/catalog/:id") || {};

  return (
    <section className="catalog-item">
      <CardWithData id={params?.id} />
    </section>
  );
};

export default CardPage;
