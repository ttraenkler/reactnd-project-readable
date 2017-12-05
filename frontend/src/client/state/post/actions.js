// redux logic for editing posts

import type { Post } from "./types";
import type { Category } from "../category/types";

// ACTION TYPE CONSTANTS __________________________________

/** comment action types */
export const type = {
  LOAD_POSTS: "load posts",
  PUBLISH_POST: "create post",
  EDIT_POST: "edit post",
  UNPUBLISH_POST: "remove post",
  VOTE_ON_POST: "vote on post"
};

// ACTION TYPES ___________________________________________

export type LoadPostsAction = {
  type: type.LOAD_POSTS,
  payload: {
    posts: Post[]
  }
};

export type CreatePostAction = {
  type: type.PUBLISH_POST,
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
  type: type.UNPUBLISH_POST,
  payload: {
    id: string
  }
};

export type VoteOnPostAction = {
  type: type.VOTE_ON_POST,
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
export const publish = ({
  title,
  body,
  author,
  category
}: Post): CreatePostAction => ({
  type: type.PUBLISH_POST,
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
export const unpublish = (id: string): RemovePostAction => ({
  type: type.UNPUBLISH_POST,
  payload: {
    id
  }
});

export const vote = (id: string, like: boolean) => ({
  type: type.VOTE_ON_POST,
  payload: {
    id,
    like
  }
});
