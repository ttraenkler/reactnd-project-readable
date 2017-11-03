import React, { PureComponent } from "react";
import { connect } from "react-redux";
import type PostType from "../../../state/posts";
import Post from "../Post";

type Props = {
  posts: PostType[]
};

class Posts extends PureComponent<Props> {
  render() {
    const { posts, category, sortBy } = this.props;
    return (
      <div className="posts">
        {Object.keys(posts)
          .map(key => posts[key])
          .filter(post => (category ? post.category === category : true))
          .sort(
            sortBy === "votes"
              ? (a, b) => b.voteScore - a.voteScore
              : (a, b) => b.timestamp - a.timestamp
          )
          .map(post => <Post key={post.id} data={post} />)}
      </div>
    );
  }
}

export default connect(state => ({
  posts: state.posts
}))(Posts);
