import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder, remove, selectCartItems, selectRequestCreateOrder
} from "../../slices";
import { withDataLoader } from "../../hocs/withDataLoader";
import { Message, Success } from "../Notice";
import { RecipientType } from "../../types";
import { CartItems } from "./CartItems";
import { Recipient } from "./Recipient";

import "./Cart.css";

/**
 * Оформление заказа
 * @component
 */
const CreateOrder = withDataLoader(
  Success,
  () => () => undefined,
  () => selectRequestCreateOrder
);

/**
 * Корзина
 * @component
 *
 */
export const Cart = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectRequestCreateOrder) || {};
  const cartItems = useSelector(selectCartItems);

  if (status) {
    return (
      <CreateOrder />
    );
  }

  if (!cartItems.length) {
    return (
      <Message message="Корзина пуста" level="warning" />
    );
  }

  // оформить заказ
  const handleApply = (owner: RecipientType) => {
    dispatch(createOrder({ items: cartItems, owner }));
  };

  // удалить позицию из корзины
  const handleRemove = (index: number) => {
    dispatch(remove(index));
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <CartItems items={cartItems} onRemove={handleRemove} />
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <Recipient onApply={handleApply} />
      </section>
    </>
  );
};

export default Cart;
