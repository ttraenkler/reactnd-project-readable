import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { formatDate } from "../../date";
import { comment } from "../../client";
import Vote from "./Vote";
import type CommentType from "../../../state/comments";
import { EditButton, DeleteButton } from "./buttons";

const CommentBox = styled.div`
  margin-left: 10px;
  margin-top: 25px;
  font-size: 13px;
  color: gray;
`;
const Date = styled.span`
  color: gray;
`;
const Footer = styled.div`
  margin: 0px;
  font-size: 12px;
  color: gray;
`;
const Author = styled.span`
  font-size: 12px;
`;

const Publication = ({ author, timestamp }) => [
  <Author key="author">{author}</Author>,
  <Date key="date">{formatDate(timestamp)}</Date>
];

type Props = CommentType;

export class Comment extends React.Component {
  static props: Props;

  onVote = (like: boolean) => {
    console.log("Comment::onVote");
    this.props.onVote(this.props.id, like);
  };

  onEdit = () => {
    console.log("Comment::onEdit");
  };

  onDelete = () => {
    console.log("Comment::onDelete", this.props.id);
  };

  render() {
    const { author, body, timestamp, voteScore } = this.props.data;
    console.log("Comment::render props", this.props);
    // TODO: comment id is missing in props
    return (
      <CommentBox>
        {body} <br />
        <Footer>
          <Publication author={author} timestamp={timestamp} />
          <Vote votes={voteScore} onVote={this.onVote} />{" "}
          <span style={{ fontSize: 20 }}>
            <EditButton onClick={this.onEdit} />{" "}
            <DeleteButton onClick={this.onDelete} />
          </span>
        </Footer>
      </CommentBox> // TODO: make edit and delete buttons work
    );
  }
}

export default connect(
  (state, ownProps) => ({
    data: state.comments[ownProps.id]
  }),
  dispatch => ({
    // TODO: misssing side effect of vote action (server update)
    onVote: async (commentId: string, like: boolean) => {
      dispatch(await comment.vote(commentId, like));
    }
  })
)(Comment);
