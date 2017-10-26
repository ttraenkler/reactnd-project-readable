import React from "react";
import type { Post as PostType } from "../../state/posts";

const Post = ({ title, body, author, timestamp, voteScore }: PostType) => (
  <div>
    <h1>Title: {title}</h1>
    <p>
      {author} {timestamp} {voteScore}
    </p>
    <p>{body}</p>
  </div>
);

export default Post;
