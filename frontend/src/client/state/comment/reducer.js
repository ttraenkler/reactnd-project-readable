import uuid from "uuid";
import { type as commentType } from "./actions";
import { type as postType } from "../post/actions";
import type Comments from "./types";
import type Action from "../generic/types";

const type = {
  ...commentType,
  ...postType
};

/** comments state reducer - processes category actions */
export const reducer = (state: Comments = {}, action: Action): Comments => {
  const { payload } = action;

  switch (action.type) {
    case type.LOAD_COMMENTS: {
      const newState = { ...state };
      payload.comments.forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    }

    case type.CREATE_COMMENT: {
      // TODO: add this to parent post comment ids array
      const id = uuid.v1();
      const newState = { ...state };
      newState[id] = {
        ...payload,
        voteScore: 1
      };
      return newState;
    }

    case type.EDIT_COMMENT: {
      const newState = { ...state };
      newState[payload.id] = {
        ...state[payload.id],
        ...payload
      };
      return newState;
    }

    case type.REMOVE_COMMENT: {
      const newState = { ...state };
      if (newState[payload.id]) {
        delete newState[payload.id];
      }
      return newState;
    }

    case type.VOTE_COMMENT: {
      const newState = { ...state };
      if (newState[payload.id]) {
        if (payload.like) {
          newState[payload.id].voteScore += 1;
        } else {
          newState[payload.id].voteScore -= 1;
        }
      }
      return newState;
    }

    default:
      return state;
  }
};
