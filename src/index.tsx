import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";
import 'reset-css';
import './styles/style.css'

const root = ReactDOM.createRoot(
  document.getElementById("app") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);