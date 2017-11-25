import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../../date";
import Vote from "./Vote";
import type PostType from "../../../state/posts";
import { vote } from "../../client";

type Props = {
  post: PostType
};

class Post extends Component<Props> {
  onVote = (like: boolean) => {
    this.props.onVote(this.props.post.id, like);
  };

  render() {
    const {
      id,
      title,
      body,
      author,
      category,
      voteScore,
      timestamp
    } = this.props.post;
    return (
      <div key={id}>
        <h2>{title}</h2>
        <div className="post-header">
          {author} {formatDate(timestamp)}{" "}
          <Link key="edit" to="/new">
            &#9998;
          </Link>
          <Link key="delete" to="/new">
            &#9003;
          </Link>
        </div>
        <div className="post-body">{body}</div>
        <div className="post-footer">
          <Vote votes={voteScore} onVote={this.onVote}>
            Category: {category}
          </Vote>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onVote: async (postId: string, like: boolean) => {
      dispatch(await vote.post(postId, like));
    }
  })
)(Post);
