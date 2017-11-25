import uuid from "uuid";
import { type as commentType } from "../comment/actions";
import { type as postType } from "./actions";
import type Post from "./types";
import type Action from "../generic/types";

const type = {
  ...commentType,
  ...postType
};

export type Posts = {
  [postId: string]: Post
};

/** posts state reducer - processes post actions */
export const reducer = (state: Posts = {}, action: Action) => {
  const { payload } = action;

  switch (action.type) {
    case type.LOAD_POSTS: {
      const newState = {};
      payload.posts.forEach(
        post => (newState[post.id] = { ...post, comments: [] })
      );
      return newState;
    }

    case type.CREATE_POST: {
      const id = uuid.v1();
      return {
        ...state,
        [id]: {
          ...payload,
          voteScore: 1,
          comments: []
        }
      };
    }

    case type.EDIT_POST: {
      // just update specific fields
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          payload
        }
      };
    }

    case type.REMOVE_POST: {
      const newState = { ...state };
      delete newState[payload.id];
      return newState;
    }

    case type.VOTE_POST: {
      const newState = { ...state };
      console.log("state", state);
      console.log("action", action);
      newState[payload.id] = {
        ...state[payload.id],
        voteScore: state[payload.id].voteScore + (payload.like ? 1 : -1)
      };
      return newState;
    }

    case type.LOAD_COMMENTS: {
      const newState = { ...state };
      payload.comments.forEach(comment => {
        if (newState[comment.parentId]) {
          newState[comment.parentId].comments.push(comment.id);
        }
      });
      return newState;
    }

    case type.CREATE_COMMENT: {
      const newState = { ...state };
      newState[payload.parentId].comments.push(payload.id);
      return newState;
    }

    case type.REMOVE_COMMENT: {
      const newState = { ...state };
      const index = newState[payload.parentId].comments.indexOf(payload.id);
      if (index > -1) {
        newState[payload.parentId].comments.splice(index);
      } else {
        const e = {
          name: "RemoveCommentNotFoundError",
          message: "Comment to be removed could not be found",
          toString: function() {
            return this.name + ": " + this.message;
          }
        };
        throw e;
      }
      return newState;
    }

    default: {
      return state;
    }
  }
};
