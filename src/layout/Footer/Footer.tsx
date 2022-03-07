import React, { FC } from "react";
import "./Footer.css";

/**
 * Application Footer
 * @component
 *
 * @prop {FC[]} content Компоненты
 */
export const Footer: FC<{ content: FC[] }> = ({ content }) => (
  <footer className="container bg-light footer">
    <div className="row">
      {content.map((Component, index) => (
        <Component key={index} />
      ))}
    </div>
  </footer>
);

export default Footer;
