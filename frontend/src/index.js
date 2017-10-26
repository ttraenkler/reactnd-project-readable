import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./state/store";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

async function fetchCategories() {
  const url = "http://localhost:3001/categories";
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" }
  });
  const json = await response.json();
  console.log(json.categories);
}

fetchCategories();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
