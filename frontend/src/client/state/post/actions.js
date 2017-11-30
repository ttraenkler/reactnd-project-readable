// redux logic for editing posts

import type { Post } from "./types";
import type { Category } from "../category/types";

// ACTION TYPE CONSTANTS __________________________________

/** comment action types */
export const type = {
  LOAD_POSTS: "load posts",
  CREATE_POST: "create post",
  EDIT_POST: "edit post",
  REMOVE_POST: "remove post",
  VOTE_POST: "vote on post"
};

// ACTION TYPES ___________________________________________

export type LoadPostsAction = {
  type: type.LOAD_POSTS,
  payload: {
    posts: Post[]
  }
};

export type CreatePostAction = {
  type: type.CREATE_POST,
  payload: {
    timestamp: number,
    title: string,
    body: string,
    author: string,
    category: Category
  }
};

export type EditPostAction = {
  type: type.EDIT_POST,
  payload: {
    id: string,
    timestamp: number,
    title: string,
    body: string,
    author: string,
    category: Category,
    voteScore: number
  }
};

export type RemovePostAction = {
  type: type.REMOVE_POST,
  payload: {
    id: string
  }
};

export type VoteOnPostAction = {
  type: type.VOTE_POST,
  payload: {
    id: string,
    like: boolean
  }
};

/** flowtypes for post actions */
export type Action =
  | LoadPostsAction
  | CreatePostAction
  | EditPostAction
  | RemovePostAction
  | VotePostAction;

// ACTION CREATORS ________________________________________

/** load all posts */
export const load = (posts: Post[]): LoadPostsAction => ({
  type: type.LOAD_POSTS,
  payload: {
    posts
  }
});

/** create a new post */
export const create = ({
  title,
  body,
  author,
  category
}: Post): CreatePostAction => ({
  type: type.CREATE_POST,
  payload: {
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  }
});

/** edit an existing post */
export const edit = (
  id: string,
  data: {
    title: string,
    body: string
  }
): EditPostAction => ({
  type: type.EDIT_POST,
  payload: {
    id,
    // TODO: missing timestamp
    title: data.title,
    body: data.body
  }
});

/** remove an existing post */
export const remove = (id: string): RemovePostAction => ({
  type: type.REMOVE_POST,
  payload: {
    id
  }
});

export const vote = (id: string, like: boolean) => ({
  type: type.VOTE_POST,
  payload: {
    id,
    like
  }
});
