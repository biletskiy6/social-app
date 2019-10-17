import React from "react";
import ReactDOM from "react-dom";
import SocialAppService from './services/SocialAppService';
import App from "./components/App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SocialAppContextProvider } from './components/SocialAppContext/SocialAppContext';

const socialAppService = new SocialAppService();

ReactDOM.render(
  <Provider store={store}>
    <SocialAppContextProvider value={socialAppService}>
      <Router>
        <App />
      </Router>
    </SocialAppContextProvider>
  </Provider>,
  document.getElementById("root")
);
