import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store, load } from "./client";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

load.all();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
