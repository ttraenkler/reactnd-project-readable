import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Vote from "./Vote";
import { post } from "../../client";
import type PostType from "../../../state/posts";
import { EditButton, DeleteButton } from "./buttons";

type Props = {
  post: PostType
};

const PostSummary = ({ post, unpublish, vote }: Props) => {
  const { id, title, voteScore, commentCount, category, author } = post;
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
        <Vote votes={voteScore} onVote={like => vote(post.id, like)} />{" "}
        Comments: {commentCount} <EditButton id={id} />
        <DeleteButton onClick={() => unpublish(id)} />
      </div>
    </div>
  );
};

export default connect(
  state => ({}),
  dispatch => ({
    vote: async (postId: string, like: boolean) => {
      dispatch(await post.vote(postId, like));
    },
    unpublish: async (postId: string) => {
      dispatch(await post.unpublish(postId));
    }
  })
)(PostSummary);
