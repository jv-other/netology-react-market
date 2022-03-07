import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartSize } from "../../slices";

/**
 * Виджет корзины
 * @component
 */
export const CartWidget = () => {
  const count = useSelector(selectCartSize);
  const navigate = useNavigate();
  const handleClick = () => navigate("/cart");

  return (
    <div
      className="header-controls-pic header-controls-cart"
      onClick={handleClick}
      role="link"
      tabIndex={-1}
    >
      {(count > 0) && (
        <div className="header-controls-cart-full">
          {count}
        </div>
      )}
      <div className="header-controls-cart-menu" />
    </div>
  );
};

export default CartWidget;
