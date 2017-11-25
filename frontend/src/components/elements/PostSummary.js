import React, { Component } from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes";
import type PostType from "../../../state/posts";

type Props = {
  post: PostType
};

class PostSummary extends Component<Props> {
  onVote = (like: boolean) => {
    console.log("voted on Post", like);
  };

  render() {
    const { id, title, body, voteScore } = this.props.post;
    return (
      <Link to={`/post/${id}`} className="post">
        <h2>{title}</h2>
        <div className="post-body">{body}</div>
        <Votes votes={voteScore} />
      </Link>
    );
  }
}

export default PostSummary;
