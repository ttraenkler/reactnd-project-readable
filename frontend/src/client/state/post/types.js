export type Post = {
  id: string, //	Unique identifier
  timestamp: number, //	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  title: string, //	Post title
  body: string, //	Post body
  author: string, //	Post author
  category: string, //	Should be one of the categories provided by the server
  voteScore: number //	Net votes the post has received (default: 1)
};
