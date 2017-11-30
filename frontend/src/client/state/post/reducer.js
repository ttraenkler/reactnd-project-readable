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
  const {
    LOAD_POSTS,
    CREATE_POST,
    EDIT_POST,
    REMOVE_POST,
    VOTE_POST,
    LOAD_COMMENTS,
    CREATE_COMMENT,
    REMOVE_COMMENT
  } = type;

  switch (action.type) {
    case LOAD_POSTS: {
      const newState = {};
      if (payload && payload.posts) {
        payload.posts.forEach(
          post => (newState[post.id] = { ...post, comments: [] })
        );
      }
      return newState;
    }

    case CREATE_POST: {
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

    case EDIT_POST: {
      // just update specific fields
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          title: payload.title,
          body: payload.body
        }
      };
    }

    case REMOVE_POST: {
      const newState = { ...state };
      delete newState[payload.id];
      return newState;
    }

    case VOTE_POST: {
      const newState = { ...state };
      newState[payload.id] = {
        ...state[payload.id],
        voteScore: state[payload.id].voteScore + (payload.like ? 1 : -1)
      };
      return newState;
    }

    case LOAD_COMMENTS: {
      const newState = { ...state };
      payload.comments.forEach(comment => {
        if (newState[comment.parentId]) {
          newState[comment.parentId].comments.push(comment.id);
        }
      });
      return newState;
    }

    case CREATE_COMMENT: {
      const newState = { ...state };
      newState[payload.parentId].comments.push(payload.id);
      return newState;
    }

    case REMOVE_COMMENT: {
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
