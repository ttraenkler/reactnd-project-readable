import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

async function fetchCategories() {
  const url = "http://localhost:3001/categories";
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" }
  });
  const { body } = response;
}

fetchCategories();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
