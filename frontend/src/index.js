import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./state/store";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { category } from "./state/categories";
import { post } from "./state/posts";

async function fetchCategories() {
  const url = "http://localhost:3001/categories";
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" }
  });
  const json = await response.json();
  store.dispatch(category.load(json.categories));
}

async function fetchPosts() {
  const url = "http://localhost:3001/posts";
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" }
  });
  const json = await response.json();
  store.dispatch(post.load(json));
}

async function post() {
  const url = "http://localhost:3001/posts";
  fetch(url, {
    method: "POST",
    body: {
      test: "test"
    }
  });
}

fetchCategories();
fetchPosts();
post();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
