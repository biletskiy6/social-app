import React from "react";
import ReactDOM from "react-dom";
import SocialAppService from './services/SocialAppService';
import App from "./components/App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SocialAppContextProvider } from './components/SocialAppContext/SocialAppContext';

const socialAppService = new SocialAppService();

ReactDOM.render(
  <SocialAppContextProvider value={socialAppService}>
    <Router>
      <App />
    </Router>
  </SocialAppContextProvider>,
  document.getElementById("root")
);
