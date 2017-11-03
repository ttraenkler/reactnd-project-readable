import React, { PureComponent } from "react";
import type CommentType from "../../../state/comments";

type Props = {
  post: CommentType
};

class Comment extends PureComponent<Props> {
  render() {
    return <div>Comment</div>;
  }
}

export default Comment;
