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
    PUBLISH_POST,
    EDIT_POST,
    UNPUBLISH_POST,
    VOTE_ON_POST,
    LOAD_COMMENTS,
    PUBLISH_COMMENT,
    UNPUBLISH_COMMENT
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

    case PUBLISH_POST: {
      return {
        ...state,
        [payload.id]: {
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

    case UNPUBLISH_POST: {
      const newState = { ...state };
      delete newState[payload.id];
      return newState;
    }

    case VOTE_ON_POST: {
      const newState = { ...state };
      newState[payload.id] = {
        ...state[payload.id],
        voteScore: state[payload.id].voteScore + (payload.like ? 1 : -1)
      };
      return newState;
    }

    case LOAD_COMMENTS: {
      const newState = { ...state };
      console.log("LOAD_COMMENTS payload =", payload);
      payload.comments.forEach(comment => {
        if (newState[comment.parentId]) {
          newState[comment.parentId].comments.push(comment.id);
        }
      });
      console.log("LOAD_COMMENTS result =", newState);
      return newState;
    }

    case PUBLISH_COMMENT: {
      const newState = {
        ...state,
        [payload.parentId]: {
          ...state[payload.parentId],
          comments: [...state[payload.parentId].comments],
          commentCount: state[payload.parentId].commentCount + 1
        }
      };
      newState[payload.parentId].comments.push(payload.id);
      return newState;
    }

    case UNPUBLISH_COMMENT: {
      const newState = {
        ...state,
        [payload.parentId]: {
          ...state[payload.parentId],
          comments: [...state[payload.parentId].comments]
        }
      };
      console.log("UNPUBLISH_COMMENT before =", newState);
      console.log("unpublish comment payload", payload);
      const index = newState[payload.parentId].comments.indexOf(payload.id);
      console.log("index", index);
      if (index > -1) {
        newState[payload.parentId].comments.splice(index, 1);
        newState[payload.parentId].commentCount =
          state[payload.parentId].commentCount - 1;
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
      console.log("UNPUBLISH_COMMENT after =", newState);
      return newState;
    }

    default: {
      return state;
    }
  }
};
