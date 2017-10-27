export const type = {
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

export const post = {
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

const initialState = {
  nextId: 0
};

export const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case type.CREATE_POST:
      const id = state.nextId;
      return {
        ...state,
        nextId: id + 1,
        posts: {
          ...state.posts,
          [id]: {
            ...payload,
            id,
            deleted: false,
            voteScore: 0
          }
        }
      };
    case type.EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.id]: payload
        }
      };
    case type.REMOVE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.id]: {
            ...state.posts[payload.id],
            deleted: true
          }
        }
      };
    default:
      return state;
  }
};
