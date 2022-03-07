import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import store from "./store";
import { Header, Main, Footer } from "./layout";
import * as Pages from "./pages";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Pages.HomePage />} />
          <Route path="/catalog" element={<Pages.CatalogPage />} />
          <Route path="/catalog/:id" element={<Pages.CardPage />} />
          <Route path="/about" element={<Pages.AboutPage />} />
          <Route path="/contacts" element={<Pages.ContactsPage />} />
          <Route path="/cart" element={<Pages.CartPage />} />
          <Route path="*" element={<Pages.NotFoundPage />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  </Provider>
);

export default App;
