export const actionType = {
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
  create: ({ title, body, author, category, voteScore }: Post) => ({
    type: action.create,
    payload: {
      id: ++nextId,
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
      voteScore,
      deleted: false
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
      voteScore,
      deleted: false
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
  const { post } = actionType;
  switch (action.type) {
    case post.create:
    case post.edit:
      return {
        ...state,
        posts: {
          ...posts,
          [action.payload.id]: action.payload
        }
      };
    case post.remove:
      return {
        ...state,
        posts: {
          ...posts,
          [action.payload.id]: {
            ...state.posts[action.payload.id],
            deleted: true
          }
        }
      };
    default:
      return state;
  }
};
