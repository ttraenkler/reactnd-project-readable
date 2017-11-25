import React, { Component } from "react";
import { connect } from "react-redux";
import type PostType from "../../../state/posts";
import PostSummary from "../PostSummary";

type Props = {
  posts: PostType[]
};

class Posts extends Component<Props> {
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
          .map(post => (
            <div
              key={post.id}
              style={{
                borderTop: "solid 1px #EEE",
                maxWidth: "600px"
              }}
            >
              <PostSummary key={post.id} post={post} />
            </div>
          ))}
      </div>
    );
  }
}

export default connect(state => ({
  posts: state.posts
}))(Posts);
