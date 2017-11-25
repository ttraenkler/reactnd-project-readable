import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { formatDate } from "../../date";
import { vote } from "../../client";
import Vote from "./Vote";
import type CommentType from "../../../state/comments";

const CommentBox = styled.div`
  margin-left: 5px;
  margin-top: 15px;
  font-size: 14px;
`;
const Date = styled.span`
  color: gray;
`;
const Footer = styled.div`
  margin: 15px;
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

  render() {
    const { author, body, timestamp, votes } = this.props;
    console.log("Comment::render props", this.props);
    // TODO: comment id is missing in props
    return (
      <CommentBox>
        {body}{" "}
        <span style={{ fontSize: 20 }}>
          <span onClick={() => console.log("edit comment", this.props.id)}>
            &#9998;
          </span>
          <span onClick={() => console.log("delete comment", this.props.id)}>
            &#9003;
          </span>
        </span>
        <br />
        <Footer>
          <Publication author={author} timestamp={timestamp} />

          <Vote votes={votes} onVote={this.onVote} />
        </Footer>
      </CommentBox> // TODO: missing edit/delete controls
    );
  }
}

export default connect(
  (state, ownProps) => ({
    votes: state.comments[ownProps.id].voteScore
  }),
  dispatch => ({
    // TODO: misssing side effect of vote action (server update)
    onVote: async (commentId: string, like: boolean) => {
      console.log("comment onvote:", commentId, like);
      const action = await vote.comment(commentId, like);
      dispatch(action);
    }
  })
)(Comment);
