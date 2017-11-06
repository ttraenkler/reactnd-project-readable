import uuid from "uuid";
import { type as commentType } from "../comment/actions";
import { type } from "./actions";
import type { Action } from "./actions";

/** posts state reducer - processes post actions */
export const reducer = (state = {}, action: Action) => {
  const { payload } = action;
  switch (action.type) {
    case type.LOAD_POSTS:
      const newState = { ...state };
      payload.posts.forEach(post => (newState[post.id] = post));
      return newState;
    case type.CREATE_POST:
      const id = uuid.v1();
      return {
        ...state,
        [id]: {
          ...payload,
          deleted: false,
          voteScore: 0,
          comments: []
        }
      };
    case type.EDIT_POST:
      return {
        ...state,
        [payload.id]: payload
      };
    case type.REMOVE_POST:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          deleted: true
        }
      };
    case commentType.CREATE_COMMENT:
      return {
        ...state,
        [payload.parentId]: {
          ...state[payload.parentId],
          comments: {
            ...state[payload.parentId].comments,
            [payload.id]: payload
          }
        }
      };
    default:
      return state;
  }
};
