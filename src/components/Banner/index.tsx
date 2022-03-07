import React, { FC } from "react";
import "./Banner.css";

/**
 * Баннер
 * @component
 *
 * @prop {string} image URL изображения
 * @prop {string} header Заголовок
 */
const Banner: FC<{ image: string, header: string }> = ({ image, header }) => (
  <div className="banner">
    <img src={image} className="img-fluid" alt="К весне готовы" />
    <h2 className="banner-header">{header}</h2>
  </div>
);

export default Banner;
