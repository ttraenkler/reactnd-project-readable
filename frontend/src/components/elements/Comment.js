import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { formatDate } from "../../date";
import Vote from "./Vote";
import type CommentType from "../../../state/comments";
import { comment as action } from "../../client";

const CommentEditor = ({
  value,
  onSubmit,
  onChange,
  onBlur,
  onReset
}: {
  value: string,
  onSubmit: Function,
  onChange: Function,
  onBlur: Function,
  onReset: Function
}) => (
  <div>
    <form onSubmit={onSubmit} onReset={onReset} onBlur={onSubmit}>
      <label>
        <input name="body" value={value} size={40} onChange={onChange} />
        <input type="submit" value="&#10003;" />
        <input type="reset" value="&#10005;" />
      </label>
    </form>
  </div>
);

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

type Props = {
  comment: CommentType,
  edit: Function,
  publish: Function,
  unpublish: Function
};

export class Comment extends Component {
  static props: Props;

  state = {
    id: "",
    author: "",
    editing: false
  };

  constructor(props) {
    super(props);
    if (props.comment) {
      const { author, body, timestamp, voteScore } = props.comment;
      this.state = {
        author,
        body,
        timestamp,
        voteScore,
        submit: false
      };
    } else {
      this.state = {
        author: "",
        body: ""
      };
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.comment) {
      const { author, body, timestamp, voteScore } = newProps.comment;
      const { id } = newProps;
      this.setState({
        id,
        author,
        body,
        timestamp,
        voteScore
      });
    }
  }

  onVote = (like: boolean) => {
    this.props.vote(like);
  };

  onEdit = () => {
    // TODO: set id
    // TODO: on finish editing publish and disable editing
    this.setState({ editing: true });
    console.log("Comment::onEdit");
  };

  onUnpublish = () => {
    this.props.unpublish();
  };

  onChange = (field, event) => this.setState({ [field]: event.target.value });

  onSubmit = async event => {
    // TODO: submit comment edits to server
    const { author, body } = this.state;
    const { comment, edit, publish } = this.props;
    event.preventDefault();
    if (comment.id) {
      console.log("edit comment", comment.id);
      await edit({ body });
    } else {
      await publish({
        author,
        body
      });
    }
    await this.setState({ submit: true, editing: false });
  };

  render() {
    const { editing, author, body, timestamp, voteScore } = this.state;
    // TODO: comment id is missing in props
    return (
      <CommentBox>
        {editing ? (
          <CommentEditor
            value={this.state.body}
            onSubmit={this.onSubmit}
            onChange={event => this.onChange("body", event)}
            onReset={this.onUnpublish}
          />
        ) : (
          <div onClick={() => this.setState({ editing: true })}>{body}</div>
        )}{" "}
        <br />
        <Footer>
          <Publication author={author} timestamp={timestamp} />
          <Vote votes={voteScore} onVote={this.onVote} />{" "}
        </Footer>
      </CommentBox>
    ); // TODO: make edit and delete buttons work
  }
}

export default connect(
  (state, props) => ({}),
  (dispatch, props) => ({
    edit: async newComment => {
      dispatch(await action.edit(props.comment.id, newComment));
    },
    unpublish: async () => {
      console.log("unpublish props", props);
      dispatch(
        await action.unpublish(props.comment.parentId, props.comment.id)
      );
    },
    // TODO: misssing side effect of vote action (server update)
    vote: async (like: boolean) => {
      console.log("vote");
      dispatch(await action.vote(props.comment.id, like));
    }
  })
)(Comment);
