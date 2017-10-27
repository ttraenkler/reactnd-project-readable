import React, { PureComponent } from "react";
import type PostType from "../../../state/posts";
import Post from "../Post";

type Props = {
  posts: PostType[]
};

class Posts extends PureComponent<Props> {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {this.props.posts.map(post => <Post post={post} />)}
      </div>
    );
  }
}

export default Posts;
