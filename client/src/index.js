import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "react-redux";
import store from "./store";
import reducer from "./reducers";

injectTapEventPlugin();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
