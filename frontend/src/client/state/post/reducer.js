import uuid from "uuid";
import { type as commentType } from "../comment/actions";
import { type } from "./actions";
import type Post from "./types";
import type Action from "../generic/types";

export type Posts = {
  [postId: string]: Post
};

/** posts state reducer - processes post actions */
export const reducer = (state: Posts = {}, action: Action) => {
  const { payload } = action;

  switch (action.type) {
    case type.LOAD_POSTS: {
      const newState = {};
      payload.posts.forEach(post => (newState[post.id] = post));
      return newState;
    }

    case type.CREATE_POST: {
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
    }

    case type.EDIT_POST: {
      return {
        ...state,
        [payload.id]: payload
      };
    }

    case type.REMOVE_POST: {
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          deleted: true
        }
      };
    }

    case commentType.CREATE_COMMENT: {
      const newState = { ...state };
      newState[payload.parentId].comments.push(payload.id);
      return newState;
    }

    case commentType.REMOVE_COMMENT: {
      const newState = { ...state };
      const index = newState[payload.parentId].comments.indexOf(payload.id);
      if (index > -1) {
        newState[payload.parentId].comments.splice(index);
      } else {
        console.log("comment to be removed not found");
      }
      return newState;
    }

    default: {
      return state;
    }
  }
};
