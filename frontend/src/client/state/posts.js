import uuid from "uuid";
import { type as commentType } from "./comments";

export const type = {
  LOAD_POSTS: "load posts",
  CREATE_POST: "create post",
  EDIT_POST: "edit post",
  REMOVE_POST: "remove post"
};

export type PostType = {
  id: string, //	Unique identifier
  timestamp: number, //	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  title: string, //	Post title
  body: string, //	Post body
  author: string, //	Post author
  category: string, //	Should be one of the categories provided by the server
  voteScore: number, //	Net votes the post has received (default: 1)
  deleted: boolean //	Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
};

export const actions = {
  load: (posts: PostType[]) => ({
    type: type.LOAD_POSTS,
    payload: {
      posts
    }
  }),
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
  remove: id => ({
    type: type.REMOVE_POST,
    payload: {
      id
    }
  })
};

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
