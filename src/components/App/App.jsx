import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

//Components
import Navbar from "../Navbar";

//Pages
import home from "../../pages/home";
import login from "../../pages/login";
import signup from "../../pages/signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#00a152",
      dark: "#002884",
      contrastText: "#fff"
    }
  }
});

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
