import React from "react";
import { NavLink } from "react-router-dom";
import { FooterSection } from "./FooterSection";
import { Footer } from "./Footer";

/**
 * Информация
 * @component
 */
const Info = () => (
  <div className="col">
    <FooterSection title="Информация">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/about" className="nav-link">О магазине</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
        </li>
      </ul>
    </FooterSection>
  </div>
);

/**
 * Информация об оплате, copyright
 * @component
 */
const PaymentsCopyright = () => (
  <div className="col">
    <FooterSection title="Принимаем к оплате:">
      <div className="footer-pay">
        <div className="footer-pay-systems footer-pay-systems-paypal" />
        <div className="footer-pay-systems footer-pay-systems-master-card" />
        <div className="footer-pay-systems footer-pay-systems-visa" />
        <div className="footer-pay-systems footer-pay-systems-yandex" />
        <div className="footer-pay-systems footer-pay-systems-webmoney" />
        <div className="footer-pay-systems footer-pay-systems-qiwi" />
      </div>
    </FooterSection>
    <FooterSection>
      <div className="footer-copyright">
        2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
        Все права защищены.
        <br />
        Доставка по всей России!
      </div>
    </FooterSection>
  </div>
);

/**
 * Контакты
 * @component
 */
const Contacts = () => (
  <div className="col text-end">
    <FooterSection title="Контакты:" className="footer-contacts">
      <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
      <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
      <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
      <div className="footer-social-links">
        <div className="footer-social-link footer-social-link-twitter" />
        <div className="footer-social-link footer-social-link-vk" />
      </div>
    </FooterSection>
  </div>
);

export const FooterContent = () => (
  <Footer content={[Info, PaymentsCopyright, Contacts]} />
);

export default FooterContent;
