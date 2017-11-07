/** comments state reducer - processes category actions */
import uuid from "uuid";
import { type } from "./actions";
import { type as postType } from "../post/actions";
import type Comment from "./types";
import type Action from "../generic/types";

export type Comments = {
  [postId: string]: {
    [commentId: string]: Comment
  }
};

export const reducer = (state: Comments = {}, action: Action): Comments => {
  const { payload } = action;

  switch (action.type) {
    case type.LOAD_COMMENTS: {
      const newState = { ...state };
      payload.comments.forEach(comment => {
        newState[comment.parentId][comment.id] = comment;
      });
      return newState;
    }

    case type.CREATE_COMMENT: {
      // TODO: add this to parent post comment ids array
      const id = uuid.v1();
      const newState = { ...state };
      if (!newState[payload.parentId]) {
        newState[payload.parentId] = {};
      }

      newState[payload.parentId][id] = {
        ...payload,
        // TODO: should posts and comments be removed or just marked deleted? how about server sync?
        deleted: false,
        parentDeleted: false,
        voteScore: 0
      };
      return newState;
    }

    case type.EDIT_COMMENT: {
      const newState = { ...state };
      newState[payload.parentId][payload.id] = {
        ...state[payload.parentId][payload.id],
        ...payload
      };
      return newState;
    }

    case type.REMOVE_COMMENT: {
      const newState = { ...state };
      if (
        newState[payload.parentId] &&
        newState[payload.parentId][payload.id]
      ) {
        delete newState[payload.parentId][payload.id];
      }
      return newState;
    }

    case postType.REMOVE_POST: {
      // TODO: remove parent post
      const newState = { ...state };
      delete newState[payload.parentId];
      return newState;
    }

    default:
      return state;
  }
};
