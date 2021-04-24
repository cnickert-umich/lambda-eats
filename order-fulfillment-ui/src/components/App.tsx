import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/:shopId/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
