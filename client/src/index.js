import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";

injectTapEventPlugin();
let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
