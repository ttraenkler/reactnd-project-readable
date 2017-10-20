import { createStore, combineReducers } from "redux";
import { types } from "./actions";

let nextPostId = 0;

const posts = (state = {}, action) => {
  const { create, edit, remove } = types.post;
  switch (action.type) {
    case create:
      ++nextPostId;
      return {
        ...state,
        posts: {
          ...posts,
          [nextPostId]: action.payload
        }
      };
    case edit:
      return {
        ...state,
        posts: {
          ...posts,
          [action.payload.id]: action.payload
        }
      };
    case remove:
      return {
        ...state,
        posts: {
          ...posts,
          [action.payload.id]: undefined
        }
      };
    default:
      return state;
  }
};

let nextCommentId = 0;

const comments = (state = {}, action) => {
  const { create, edit, remove } = types.comment;
  switch (action.type) {
    case create:
      ++nextCommentId;
      return {
        ...state,
        comments: {
          ...comments,
          [nextCommentId]: action.payload
        }
      };
    case edit:
      return {
        ...state,
        comments: {
          ...comments,
          [action.payload.id]: action.payload
        }
      };
    case remove:
      return {
        ...state,
        comments: {
          ...comments,
          [action.payload.id]: undefined
        }
      };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    posts,
    comments
  })
);
export default store;
