import { combineReducers } from "redux";
import { reducer as posts } from "./post/reducer";
import { reducer as comments } from "./comment/reducer";
import { reducer as categories } from "./category/reducer";

export default combineReducers({
  posts,
  comments,
  categories
});
