import React, { useEffect } from 'react';
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
import setAuthToken from "./Utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import AccountPage from "./Components/AccountPage";
import PasswordResetPage from "./Components/PasswordResetPage";
import PasswordResetEmail from "./Components/PasswordResetEmail";

if(localStorage.token){
    setAuthToken(localStorage.token)
}


const App = () => {
    useEffect(() => {
       store.dispatch(loadUser());
    }, []);

    return(
        <Provider store={ store }>
          <Router>
              <div className="App">
                  <Switch>
                      <PrivateRoute exact path="/home" component={Home} />
                      <PrivateRoute exact path="/account" component={AccountPage} />
                      <Route exact path="/" component={LandingPage} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/reset/:token" component={PasswordResetPage} />
                      <Route exact path="/enter_email" component={PasswordResetEmail} />
                      <Route exact path="/register" component={Registration} />
                      <Route exact path="/asset/:asset_id" component={AssetPage} />
                      <PrivateRoute exact path="/addasset" component={AddAssetPage} />
                  </Switch>
              </div>
          </Router>
        </Provider>
    )};

export default App;
