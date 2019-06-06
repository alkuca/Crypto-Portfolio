import React, { Component } from 'react';
import './App.css';
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (

          <Router>
              <div className="App">
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Registration} />
              </div>
          </Router>

    );
  }
}

export default App;
