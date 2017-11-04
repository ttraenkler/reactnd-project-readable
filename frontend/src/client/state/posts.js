// redux logic for editing posts
import uuid from "uuid";
import { type as commentType } from "./comments";
import type { Post as PostType } from "../types";

/** comment action types */
export const type = {
  LOAD_POSTS: "load posts",
  CREATE_POST: "create post",
  EDIT_POST: "edit post",
  REMOVE_POST: "remove post"
};

/** post actions */
export const actions = {
  /** load all posts */
  load: (posts: PostType[]) => ({
    type: type.LOAD_POSTS,
    payload: {
      posts
    }
  }),
  /** create a new post */
  create: ({ title, body, author, category }: PostType) => ({
    type: type.CREATE_POST,
    payload: {
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    }
  }),
  /** edit an existing post */
  edit: (id, { title, body, author, category, voteScore }: PostType) => ({
    type: type.EDIT_POST,
    payload: {
      id,
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
      voteScore
    }
  }),
  /** remove an existing post */
  remove: id => ({
    type: type.REMOVE_POST,
    payload: {
      id
    }
  })
};

/** posts state reducer - processes post actions */
export const reducer = (state = {}, action) => {
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
