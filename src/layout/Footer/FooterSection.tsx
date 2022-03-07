/* eslint-disable react/require-default-props */
import React, { FC, ReactNode } from "react";

/**
 * Секция футера
 * @component
 *
 * @prop {ReactNode} children
 * @prop {string} title Заголовок
 * @prop {string} className Классы
 */
export const FooterSection: FC<{ children: ReactNode, title?: string, className?: string }> = ({
  children, title, className
}) => (
  <section className={className}>
    {title && (<h5>{title}</h5>)}
    {children}
  </section>
);

export default FooterSection;
