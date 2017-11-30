import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../../date";
import Vote from "./Vote";
import { post } from "../../client";
import type PostType from "../../../state/posts";
import { EditButton, DeleteButton } from "./buttons";

type Props = {
  post: PostType
};

// TODO: make edit and delete buttons work
class Post extends Component {
  static props: Props;

  onVote = (like: boolean) => {
    this.props.onVote(this.props.post.id, like);
  };

  onEdit = () => {
    console.log("Post::onEdit");
  };

  onDelete = () => {
    console.log("Post::onDelete");
  };

  render() {
    const {
      id,
      title,
      body,
      author,
      category,
      voteScore,
      timestamp,
      commentCount
    } = this.props.post;
    return (
      <div key={id}>
        <h2>{title}</h2>
        <div className="post-header">
          {author} {formatDate(timestamp)}{" "}
          <Vote votes={voteScore} onVote={this.onVote}>
            Category: {category}
          </Vote>
          <span style={{ marginLeft: 5 }}>Comments: {commentCount}</span>{" "}
          <span style={{ fontSize: 20 }}>
            <EditButton onClick={this.onEdit} />{" "}
            <DeleteButton onClick={this.onDelete} />
          </span>
        </div>
        <div className="post-body">{body}</div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onVote: async (postId: string, like: boolean) => {
      dispatch(await post.vote(postId, like));
    }
  })
)(Post);
