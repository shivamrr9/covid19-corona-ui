import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga";

ReactGA.initialize("UA-162477571-1");
ReactGA.pageview("/");
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
