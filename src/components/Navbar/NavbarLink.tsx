import React, { FC } from "react";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";

/**
 * Компонент визуализации пункта меню навигационной панели
 *
 * @component
 * @param {NavLinkProps} props Свойства
 */
export const NavbarLink: FC<NavLinkProps> = (props) => {
  const location = useLocation();
  const { to, children } = props;
  return (
    <li className={(to === location.pathname) ? "active" : undefined}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <NavLink {...props} className="nav-link">{children}</NavLink>
    </li>
  );
};

export default NavbarLink;
