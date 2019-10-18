import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import store from '../../redux/store';
import "./App.scss";
import muiTheme from '../../util/muiTheme';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import jwtDecode from 'jwt-decode';
//Components
import Navbar from "../Navbar";
import AuthRoute from '../AuthRoute';
//Pages
import home from "../../pages/home";
import login from "../../pages/login";
import signup from "../../pages/signup";
import { LOGOUT_USER, SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "../../redux/types";
import axios from 'axios';


const theme = createMuiTheme(muiTheme);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch({ type: LOGOUT_USER });
    store.dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authenticated'] = token;
  }
} else {
  store.dispatch({ type: SET_UNAUTHENTICATED });
}

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
