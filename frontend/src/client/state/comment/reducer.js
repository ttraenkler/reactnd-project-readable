/** comments state reducer - processes category actions */
import uuid from "uuid";
import { type } from "./actions";
import { type as postType } from "../post/actions";
import type Comment from "./types";

export type Action = { type: string };
export type Comments = {
  [commentId: string]: Comment
};

const { LOAD_COMMENTS, CREATE_COMMENT, EDIT_COMMENT, REMOVE_COMMENT } = type;
const { REMOVE_POST } = postType;

export const reducer = (state: Comments = {}, action: Action): Comments => {
  const { payload } = action;
  switch (action.type) {
    case LOAD_COMMENTS: {
      const newState = { ...state };
      payload.comments.forEach(comment => (newState[comment.id] = comment));
      return newState;
    }
    case CREATE_COMMENT:
      const id = uuid.v1();
      return {
        ...state,
        [id]: {
          ...payload,
          deleted: false,
          parentDeleted: false,
          voteScore: 0
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [payload.id]: payload
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          deleted: true
        }
      };
    case REMOVE_POST: {
      const newState = { ...state };
      for (const key in newState.comments) {
        if (newState[key].parentId === payload.id) {
          newState[key].parentDeleted = true;
        }
      }
      return newState;
    }
    default:
      return state;
  }
};
