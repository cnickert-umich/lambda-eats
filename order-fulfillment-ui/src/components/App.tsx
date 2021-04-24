import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./footer/Footer";

function App() {
  return (



    <Router>
      <div style={{ minHeight: "90%" }}>
        <Switch>

          <Route exact path="/">
            <h1>Not Found</h1>
            <p>A shop id must be specified in the URL path. If you are a software admin, login to the admin page <Link to="admin">here</Link></p>
          </Route>

          <Route exact path="/admin">
            <p>Admin Page</p>
          </Route>

          {/* <Route exact path="/:shopId/checkout/">
      <CartProvider>
        <Checkout />
      </CartProvider>
    </Route> */}

          <Route path="/:shopId">
            <Dashboard />
          </Route>

        </Switch>
      </div>
      <Footer />
    </Router>



  );
}

export default App;
