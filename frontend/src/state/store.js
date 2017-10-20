import { createStore, combineReducers } from "redux";
import { reducer as posts } from "./posts";
import { reducer as comments } from "./comments";

export default createStore(
  combineReducers({
    posts,
    comments
  })
);
