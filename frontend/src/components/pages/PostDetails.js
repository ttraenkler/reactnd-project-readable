import React from "react";
import { connect } from "react-redux";
import type { Post as PostType } from "../../state/posts";
import Post from "../elements/Post";
import Comments from "../elements/lists/Comments";

const PostDetails = ({ post, comments }: PostType) => {
  return (
    <div>
      <Post data={post} />
      <Comments comments={comments} />
    </div>
  );
};

export default connect((state, ownProps) => ({
  post: state.posts[ownProps.match.params.id],
  comments: state.comments[ownProps.match.params.id]
}))(PostDetails);
