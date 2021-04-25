import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../../node_modules/mdb-react-ui-kit/dist/scss/mdb.free.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CartProvider } from '../contexts/useCartContext';
import React from "react";
import ShopFront from "./shop/ShopFront";
import AdminPage from "./browse/BrowsePage";
import Footer from "./footer/Footer";
import BrowsePage from "./browse/BrowsePage";

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: "90%" }}>
        <Switch>

          <Route exact path="/">
            <BrowsePage />
          </Route>

          <Route exact path="/admin">
            <AdminPage />
          </Route>

          {/* <Route exact path="/:shopId/checkout/">
            <CartProvider>
              <Checkout />
            </CartProvider>
          </Route> */}

          <Route path="/:shopId">
            <CartProvider>
              <ShopFront />
            </CartProvider>
          </Route>

        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
