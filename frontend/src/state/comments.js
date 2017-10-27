import { type as postType } from "./posts";

export const type = {
  CREATE_COMMENT: "create comment",
  EDIT_COMMENT: "edit comment",
  REMOVE_COMMENT: "remove comment"
};

export type CommentType = {
  id: string, // Unique identifier
  parentId: string, // id of the parent post
  timestamp: number, //	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  body: string, // Comment body
  author: string, // Comment author
  voteScore: number, //	Net votes the comment has received (default: 1)
  deleted: boolean, //	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
  parentDeleted: boolean //	Flag for when the the parent post was deleted, but the comment itself was not.
};

export const comment = {
  create: (postId, { body, author }: CommentType) => ({
    type: type.CREATE_COMMENT,
    payload: {
      parentId: postId,
      timestamp: Date.now(),
      body,
      author
    }
  }),
  edit: (id, { body, author, voteScore }: Post) => ({
    type: type.EDIT_COMMENT,
    payload: {
      id,
      timestamp: Date.now(),
      body,
      author,
      voteScore
    }
  }),
  remove: id => ({
    type: type.REMOVE_COMMENT,
    payload: {
      id
    }
  })
};

const initialState = {
  nextId: 0
};

export const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case type.CREATE_COMMENT:
      const id = state.nextId;
      return {
        ...state,
        nextId: id + 1,
        comments: {
          ...state.comments,
          [id]: {
            ...payload,
            id,
            deleted: false,
            parentDeleted: false,
            voteScore: 0
          }
        }
      };
    case type.EDIT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.id]: payload
        }
      };
    case type.REMOVE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.id]: {
            ...state.comments[payload.id],
            deleted: true
          }
        }
      };
    case postType.REMOVE_POST:
      const newState = { ...state, comments: { ...state.comments } };
      for (const key in newState.comments) {
        if (newState.comments[key].parentId === payload.id) {
          newState.comments[key].parentDeleted = true;
        }
      }
      return newState;
    default:
      return state;
  }
};
