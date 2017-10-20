import { type as post } from "./posts";

export const type = {
  comment: {
    create: "create comment",
    edit: "edit comment",
    remove: "remove comment"
  }
};

export type Comment = {
  id: string, // Unique identifier
  parentId: string, // id of the parent post
  timestamp: number, //	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  body: string, // Comment body
  author: string, // Comment author
  voteScore: number, //	Net votes the comment has received (default: 1)
  deleted: boolean, //	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
  parentDeleted: boolean //	Flag for when the the parent post was deleted, but the comment itself was not.
};

let nextId = 0;

export const comment = {
  create: ({ parentId, body, author }: Comment) => ({
    type: type.comment.create,
    payload: {
      parentId,
      timestamp: Date.now(),
      body,
      author
    }
  }),
  edit: ({ id, title, body, author, category, voteScore }: Post) => ({
    type: type.comment.edit,
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
    type: type.comment.remove,
    payload: {
      id
    }
  })
};

const initialState = {
  nextId: 0
};

export const reducer = (state = initialState, action) => {
  const { comment } = type;
  const { payload } = action;

  switch (action.type) {
    case comment.create:
      return {
        ...state,
        nextId: state.nextId + 1,
        comments: {
          ...state.comments,
          [nextId]: {
            ...payload,
            id: nextId,
            deleted: false,
            parentDeleted: false,
            voteScore: 0
          }
        }
      };
    case comment.edit:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.id]: payload
        }
      };
    case comment.remove:
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
    case post.remove:
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
