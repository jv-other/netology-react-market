import React from "react";
import { Navbar, NavbarLink } from "../../components/Navbar";
import { CartWidget, SearchWidget } from "../../components/Widgets";

import "./Header.css";

/**
 * Application Header
 * @component
 */
export const Header = () => {
  const navMenu = (
    <>
      <NavbarLink to="/">Главная</NavbarLink>
      <NavbarLink to="/catalog">Каталог</NavbarLink>
      <NavbarLink to="/about">О магазине</NavbarLink>
      <NavbarLink to="/contacts">Контакты</NavbarLink>
    </>
  );
  const navControls = (
    <>
      <SearchWidget />
      <CartWidget />
    </>
  );

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <Navbar menu={navMenu} controls={navControls} />
        </div>
      </div>
    </header>
  );
};

export default Header;
