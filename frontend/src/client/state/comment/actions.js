// redux logic for editing post comments
// @flow

import type { Comment } from "./types";

/** load comments action type */
export type LoadComments = {
  type: "load comments",
  payload: {
    comments: Comment[]
  }
};
/** create comment action type */
export type CreateComment = {
  type: "create comment",
  payload: {
    parentId: string,
    timestamp: number,
    body: string,
    author: string
  }
};
/** edit comment action type */
export type EditComment = {
  type: "edit comment",
  payload: {
    id: string,
    timestamp: number,
    body: string
  }
};
/** remove comment action type */
export type RemoveComment = {
  type: "remove comment",
  payload: {
    id: string,
    parentId: string
  }
};

/** comment action type constants */
export const type = {
  LOAD_COMMENTS: "load comments",
  CREATE_COMMENT: "create comment",
  EDIT_COMMENT: "edit comment",
  REMOVE_COMMENT: "remove comment"
};

/** load comments action creator */
export const load = (comments: Comment[]): LoadComments => ({
  type: type.LOAD_COMMENTS,
  payload: {
    comments
  }
});
/** create comment action creator */
export const create = (postId: string, comment: Comment): CreateComment => ({
  type: type.CREATE_COMMENT,
  payload: {
    parentId: postId,
    timestamp: Date.now(),
    body: comment.body,
    author: comment.author
  }
});
/** edit comment action creator */
export const edit = (
  postId: string,
  id: string,
  comment: Comment
): EditComment => ({
  type: type.EDIT_COMMENT,
  payload: {
    id,
    parentId: postId,
    timestamp: Date.now(),
    body: comment.body
  }
});
/** remove comment action creator */
export const remove = (postId: string, id: string): RemoveComment => ({
  type: type.REMOVE_COMMENT,
  payload: {
    id,
    parentId: postId
  }
});
