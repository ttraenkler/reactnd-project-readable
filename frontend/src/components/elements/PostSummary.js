import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Vote from "./Vote";
import { post } from "../../client";
import type PostType from "../../../state/posts";
import { EditButton, DeleteButton } from "./buttons";

type Props = {
  post: PostType
};

// TODO: make edit and delete buttons work
class PostSummary extends Component {
  static props: Props;

  render() {
    const {
      id,
      title,
      voteScore,
      commentCount,
      category,
      author
    } = this.props.post;
    return (
      <div>
        <Link to={`/${category}/${id}`} className="post">
          <h2>{title}</h2>
        </Link>
        <div
          style={{
            color: "rgb(200,200,200)",
            fontSize: 12,
            marginBottom: 15
          }}
        >
          Author: {author}{" "}
          <Vote
            votes={voteScore}
            onVote={like => this.props.onVote(this.props.post.id, like)}
          />{" "}
          Comments: {commentCount} <EditButton /> <DeleteButton />
        </div>
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
)(PostSummary);
