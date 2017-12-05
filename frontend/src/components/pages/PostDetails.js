import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../elements/Post";
import Comments from "../elements/lists/Comments";
import { post, comment } from "../../client";
import type { Post as PostType } from "../../state/post/types";
import type { Comment as CommentType } from "../../state/comment/types";
import { Redirect } from "react-router-dom";
type Props = {
  post: PostType,
  comments: CommentType[]
};

class PostDetails extends Component<Props> {
  state = { loaded: false, redirect: false };

  async componentDidMount() {
    await this.props.load(this.props.id);
    if (this.props.post) {
      this.setState({
        loaded: true
      });
    } else {
      this.setState({
        redirect: true
      });
    }
  }

  render() {
    const { loaded, redirect } = this.state;
    const { id, post, comments } = this.props;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <div>
        {loaded ? <Post post={post} /> : null}
        {loaded ? <Comments postId={id} comments={comments} /> : null}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const { id } = ownProps.match.params;
    return {
      id,
      post: state.posts[id],
      comments: state.posts[id]
        ? state.posts[id].comments
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
