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
  const {
    LOAD_COMMENTS,
    PUBLISH_COMMENT,
    EDIT_COMMENT,
    UNPUBLISH_COMMENT,
    VOTE_ON_COMMENT
  } = type;

  switch (action.type) {
    case LOAD_COMMENTS: {
      const newState = { ...state };
      payload.comments.forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    }

    case PUBLISH_COMMENT: {
      const newState = { ...state };
      newState[payload.id] = {
        ...payload,
        voteScore: 1
      };
      return newState;
    }

    case EDIT_COMMENT: {
      const newState = { ...state };
      newState[payload.id] = {
        ...state[payload.id],
        ...payload
      };
      return newState;
    }

    case UNPUBLISH_COMMENT: {
      const newState = { ...state };
      if (newState[payload.id]) {
        delete newState[payload.id];
      }
      return newState;
    }

    case VOTE_ON_COMMENT: {
      const newState = { ...state };
      if (newState[payload.id]) {
        newState[payload.id] = {
          ...state[payload.id],
          voteScore: state[payload.id].voteScore + (payload.like ? 1 : -1)
        };
      }
      return newState;
    }

    default:
      return state;
  }
};
