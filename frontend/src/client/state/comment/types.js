/** comment type as received from server */
export type Comment = {
  id: string, // Unique identifier
  parentId: string, // id of the parent post
  timestamp: number, //	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  body: string, // Comment body
  author: string, // Comment author
  voteScore: number //	Net votes the comment has received (default: 1)
};

export type Comments = {
  [commentId: string]: Comment
};
