import React, { Component } from "react";
import Comment from "../Comment";
import CommentForm from "../CommentForm";
import type { Comments as CommentsType } from "../../../client/state/comment/types";

export type Props = {
  postId: string,
  comments: CommentsType
};

export default class Comments extends Component {
  static props: Props;

  render() {
    const { postId, comments } = this.props;

    // TODO: sort by vote score
    // TODO: add new comment control with inline comment form
    return (
      <div>
        {comments.map(comment => (
          <Comment
            key={`${comment.id}${comment.timestamp}`}
            comment={comment}
          />
        ))}
        <CommentForm postId={postId} />
      </div>
    );
  }
}
