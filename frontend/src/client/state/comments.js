// redux logic for editing post comments
import uuid from "uuid";
import { type as postType } from "./posts";
import type { Comment as CommentType } from "../types";

/** comment action types */
export const type = {
  CREATE_COMMENT: "create comment",
  EDIT_COMMENT: "edit comment",
  REMOVE_COMMENT: "remove comment"
};

/** comment actions */
export const actions = {
  /** create a new comment */
  create: (postId, { body, author }: CommentType) => ({
    type: type.CREATE_COMMENT,
    payload: {
      parentId: postId,
      timestamp: Date.now(),
      body,
      author
    }
  }),
  /** edit an existing comment */
  edit: (id, { body, author, voteScore }: Post) => ({
    type: type.EDIT_COMMENT,
    payload: {
      id,
      timestamp: Date.now(),
      body,
      author,
      voteScore
    }
  }),
  /** remove an existing comment */
  remove: id => ({
    type: type.REMOVE_COMMENT,
    payload: {
      id
    }
  })
};

/** comments state reducer - processes category actions */
export const reducer = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case type.CREATE_COMMENT:
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
    case type.EDIT_COMMENT:
      return {
        ...state,
        [payload.id]: payload
      };
    case type.REMOVE_COMMENT:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          deleted: true
        }
      };
    case postType.REMOVE_POST:
      const newState = { ...state };
      for (const key in newState.comments) {
        if (newState[key].parentId === payload.id) {
          newState[key].parentDeleted = true;
        }
      }
      return newState;
    default:
      return state;
  }
};
