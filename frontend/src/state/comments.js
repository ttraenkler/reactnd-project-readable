import { actionType as post } from "./posts";

export const actionType = {
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
  create: ({ parentId, body, author, voteScore }: Post) => ({
    type: action.create,
    payload: {
      id: ++nextId,
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
      voteScore
    }
  }),
  edit: ({ id, title, body, author, category, voteScore }: Post) => ({
    type: action.edit,
    payload: {
      id: ++nextId,
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
      voteScore
    }
  }),
  remove: id => ({
    type: action.remove,
    payload: {
      id
    }
  })
};

export const reducer = (state = {}, action) => {
  const { comment } = actionType;
  switch (action.type) {
    case comment.create:
    case comment.edit:
      return {
        ...state,
        comments: {
          ...comments,
          [action.payload.id]: action.payload
        }
      };
    case comment.remove:
      return {
        ...state,
        comments: {
          ...comments,
          [action.payload.id]: {
            ...state.comments[action.payload.id],
            deleted: true
          }
        }
      };
    case post.remove:
      const newState = { ...state, comments: { ...state.comments } };
      for (const key in newState.comments) {
        if (newState.comments[key].parentId === action.payload.id) {
          newState.comments[key].parentDeleted = true;
        }
      }
      return newState;
    default:
      return state;
  }
};
