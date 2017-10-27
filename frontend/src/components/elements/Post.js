import React, { PureComponent } from "react";
import type PostType from "../../../state/posts";

type Props = {
  post: PostType
};

class Post extends PureComponent<Props> {
  render() {
    const { title, body } = this.props.post;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Post;
