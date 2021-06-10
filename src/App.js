import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import About from "./pages/About";
import Landing from "./pages/home/Landing";
import News from "./pages/News";

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <CssBaseline></CssBaseline>
      </React.Fragment>
      <Router>
        <NavBar></NavBar>
        <main>
          <Switch>
            <Route path="/news">
              <News></News>
            </Route>
            <Route path="/about">
              <About></About>
            </Route>

            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}
