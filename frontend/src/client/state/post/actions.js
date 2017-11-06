// redux logic for editing posts

import type { Post } from "./types";
import type { Category } from "../category/types";

/** comment action types */
export const type = {
  LOAD_POSTS: "load posts",
  CREATE_POST: "create post",
  EDIT_POST: "edit post",
  REMOVE_POST: "remove post"
};

export type LoadPostsAction = {
  type: type.LOAD_POSTS,
  payload: {
    posts: Post[]
  }
};

/** load all posts */
export const load = (posts: Post[]): LoadPostsAction => ({
  type: type.LOAD_POSTS,
  payload: {
    posts
  }
});

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

/** edit an existing post */
export const edit = (
  id: string,
  { title, body, author, category, voteScore }: Post
): EditPostAction => ({
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
});

export type RemovePostAction = {
  type: type.REMOVE_POST,
  payload: {
    id: string
  }
};

/** remove an existing post */
export const remove = (id: string): RemovePostAction => ({
  type: type.REMOVE_POST,
  payload: {
    id
  }
});

/** flowtypes for post actions */
export type Action =
  | LoadPostsAction
  | CreatePostAction
  | EditPostAction
  | RemovePostAction;
