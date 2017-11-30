// redux logic for editing post comments
// @flow

import type { Comment } from "./types";

// ACTION TYPE CONSTANTS ______________________________________________________

/** comment action type constants */
export const type = {
  LOAD_COMMENTS: "load comments",
  CREATE_COMMENT: "create comment",
  EDIT_COMMENT: "edit comment",
  REMOVE_COMMENT: "remove comment",
  VOTE_COMMENT: "vote on comment"
};

// ACTION FLOWTYPES ___________________________________________________________

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
/** remove comment action type */
export type VoteOnComment = {
  type: "vote on comment",
  payload: {
    id: string,
    parentId: string,
    like: boolean
  }
};

// ACTION CREATORS ____________________________________________________________

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
export const edit = (id: string, data: { body: string }): EditComment => ({
  type: type.EDIT_COMMENT,
  payload: {
    id,
    timestamp: Date.now(),
    body: data.body
  }
});

/** remove comment action creator */
export const remove = (id: string): RemoveComment => ({
  type: type.REMOVE_COMMENT,
  payload: {
    id
  }
});

/** vote on comment action creator */
export const vote = (id: string, like: boolean): VoteOnComment => ({
  type: type.VOTE_COMMENT,
  payload: {
    id,
    like
  }
});
