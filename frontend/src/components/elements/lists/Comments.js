import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Comment from "../Comment";

export class Comments extends PureComponent {
  render() {
    const { comments } = this.props;
    return (
      <p className="categories">
        Comments
        {comments.map(comment => <Comment data={comment} />)}
      </p>
    );
  }
}

export default connect(state => ({ comments: state.comments }))(Comments);
