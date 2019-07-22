import React, { Component } from 'react';
import './App.css';
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AssetPage from "./Components/AssetPage"
import AddAssetPage from "./Components/AddAssetPage";
import LandingPage from "./Components/LandingPage";
import { Provider } from "react-redux";
import store from "./store";


class App extends Component {
  render() {
    return (
        <Provider store={ store }>
          <Router>
              <div className="App">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/landing" component={LandingPage} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Registration} />
                      <Route exact path="/asset" component={AssetPage} />
                      <Route exact path="/addasset" component={AddAssetPage} />
                  </Switch>
              </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
