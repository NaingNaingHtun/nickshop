import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import ShoppingCart from "./pages/ShoppingCart";
import Authentication from "./pages/Authentication";
import ProductsList from "./pages/ProductsList";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import WishList from "./pages/WishList";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import OrderConfimration from "./pages/OrderConfimration";
import PageNotFound from "./pages/PageNotFound";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Routes>
            <Route path="/product/:id" exact element={<SingleProduct />} />
            <Route path="/products" exact element={<ProductsList />} />
            <Route path="/cart" exact element={<ShoppingCart />} />
            <Route path="/register" exact element={<Authentication />} />
            <Route path="/login" exact element={<Authentication />} />
            <Route
              path="/order-confirmation"
              exact
              element={<OrderConfimration />}
            />
            <Route path="/wishlist" exact element={<WishList />} />
            <Route path="/contact-us" exact element={<ContactUs />} />
            <Route path="/about-us" exact element={<AboutUs />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
