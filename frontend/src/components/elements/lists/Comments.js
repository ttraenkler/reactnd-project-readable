import React from "react";
import Comment from "../Comment";
import CommentForm from "../CommentForm";
import type { Comments as CommentsType } from "../../../client/state/comment/types";

export type Props = {
  postId: string,
  comments: CommentsType
};

const Comments = ({ postId, comments }: Props) => (
  <div>
    {comments.map(comment => (
      <Comment key={`${comment.id}${comment.timestamp}`} comment={comment} />
    ))}
    <CommentForm postId={postId} />
  </div>
);

export default Comments;
