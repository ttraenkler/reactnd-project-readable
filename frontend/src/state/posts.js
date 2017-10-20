export const type = {
  post: {
    create: "create post",
    edit: "edit post",
    remove: "remove post"
  }
};

export type Post = {
  id: string, //	Unique identifier
  timestamp: number, //	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  title: string, //	Post title
  body: string, //	Post body
  author: string, //	Post author
  category: string, //	Should be one of the categories provided by the server
  voteScore: number, //	Net votes the post has received (default: 1)
  deleted: boolean //	Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
};

let nextId = 0;

export const post = {
  create: ({ title, body, author, category }: Post) => ({
    type: type.post.create,
    payload: {
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    }
  }),
  edit: ({ id, title, body, author, category, voteScore }: Post) => ({
    type: type.post.edit,
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
    type: type.post.remove,
    payload: {
      id
    }
  })
};

export const reducer = (state = {}, action) => {
  const { post } = type;
  const { payload } = action;

  switch (action.type) {
    case post.create:
      return {
        ...state,
        nextId: state.nextId + 1,
        posts: {
          ...state.posts,
          [nextId]: {
            ...payload,
            id: nextId,
            deleted: false,
            voteScore: 0
          }
        }
      };
    case post.edit:
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.id]: payload
        }
      };
    case post.remove:
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
