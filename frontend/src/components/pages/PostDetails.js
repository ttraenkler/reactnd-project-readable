import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../elements/Post";
import Comments from "../elements/lists/Comments";
import { post, comment } from "../../client";
import type { Post as PostType } from "../../state/post/types";
import type { Comment as CommentType } from "../../state/comment/types";

type Props = {
  post: PostType,
  comments: CommentType[]
};

class PostDetails extends Component<Props> {
  state = { loaded: false };

  async componentWillMount() {
    console.log("PostDetails::componentWillMount props", this.props);
    await this.props.load(this.props.id);
    console.log(
      "PostDetails::componentWillMount props after loading",
      this.props
    );
    this.setState(
      {
        loaded: true
      },
      () => console.log("PostDetails::componentWillMount state", this.state)
    );
  }

  render() {
    const { loaded } = this.state;
    const { post, comments } = this.props;
    // TODO: edit / delete controls
    return (
      <div>
        {loaded ? <Post post={post} /> : null}
        {loaded ? <Comments comments={comments} /> : null}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const postId = ownProps.match.params.id;
    return {
      id: postId,
      post: state.posts[postId],
      comments: state.posts[postId]
        ? state.posts[postId].comments
            .map(commentId => state.comments[commentId])
            .sort((a, b) => b.voteScore - a.voteScore)
        : []
    };
  },
  dispatch => ({
    load: async (postId: string) => {
      dispatch(await post.load(postId));
      dispatch(await comment.load(postId));
    }
  })
)(PostDetails);
