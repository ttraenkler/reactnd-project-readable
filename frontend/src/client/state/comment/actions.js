// redux logic for editing post comments
// @flow

import type Comment from "./types";

/** comment action types */
export const type = {
  LOAD_COMMENTS: "load comments",
  CREATE_COMMENT: "create comment",
  EDIT_COMMENT: "edit comment",
  REMOVE_COMMENT: "remove comment"
};

export type LoadCommentsAction = {
  type: "load comments",
  payload: {
    comments: Comment[]
  }
};
/** load all comments */
export const load = (comments: Comment[]): LoadCommentsAction => ({
  type: type.LOAD_COMMENTS,
  payload: {
    comments
  }
});

export type CreateCommentAction = {
  type: "create comment",
  payload: {
    parentId: string,
    timestamp: number,
    body: string,
    author: string
  }
};
/** create a new comment */
export const create = (
  postId: string,
  { body, author }: Comment
): CreateCommentAction => ({
  type: type.CREATE_COMMENT,
  payload: {
    parentId: postId,
    timestamp: Date.now(),
    body,
    author
  }
});

export type EditCommentAction = {
  type: "edit comment",
  payload: {
    id: string,
    timestamp: number,
    body: string,
    author: string,
    voteScore: number
  }
};
/** edit an existing comment */
export const edit = (
  id: string,
  { body, author, voteScore }: Comment
): EditCommentAction => ({
  type: type.EDIT_COMMENT,
  payload: {
    id,
    timestamp: Date.now(),
    body,
    author,
    voteScore
  }
});

export type RemoveCommentAction = {
  type: "remove comment",
  payload: {
    id: string
  }
};
/** remove an existing comment */
export const remove = (id: string): RemoveCommentAction => ({
  type: type.REMOVE_COMMENT,
  payload: {
    id
  }
});

export type Action =
  | LoadCommentsAction
  | CreateCommentAction
  | EditCommentAction
  | RemoveCommentAction;
