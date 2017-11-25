import React, { Component } from "react";
import Comment from "../Comment";
import Form from "../CommentForm";
import type { Comments as CommentsType } from "../../../client/state/comment/types";

export type Props = {
  comments: CommentsType
};

export default class Comments extends Component<Props> {
  render() {
    const { comments } = this.props;
    console.log("Comments props", this.props);
    // TODO: sort by vote score
    // TODO: add new comment control with inline comment form
    return (
      <div>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            parentId={comment.parentId}
            author={comment.author}
            timestamp={comment.timestamp}
            body={comment.body}
          />
        ))}
        <Form />
      </div>
    );
  }
}
