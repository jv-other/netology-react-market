import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import logo from "../../images/header-logo.png";

/**
 * Навигационная панель
 * @component
 *
 * @prop {ReactNode} menu Элементы меню
 * @prop {ReactNode} controls Дополнительные элементы (виджеты)
 *
 */
export const Navbar: FC<{ menu?: ReactNode, controls?: ReactNode }> = ({ menu, controls }) => (
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <NavLink to="/" className="navbar-brand">
      <img src={logo} alt="Bosa Noga" />
    </NavLink>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav me-auto">
        {menu}
      </ul>
    </div>
    {controls && (
      <div className="header-controls-pics">{controls}</div>
    )}
  </nav>
);

Navbar.defaultProps = {
  menu: undefined,
  controls: undefined
};

export default Navbar;
