import React, { Component } from "react";
import { connect } from "react-redux";
import type CommentType from "../../client/state/comment/types";
import { comment as action } from "../../client";

export type Props = {
  postId: string,
  comment?: CommentType,
  publish: Function
};

export class CommentForm extends Component {
  static props: Props;

  constructor(props) {
    super(props);
    if (props.comment) {
      const { author, body } = props.comment;
      this.state = {
        author,
        body,
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
      const { author, body } = newProps.comment;
      this.setState({
        author,
        body
      });
    }
  }

  onChange = (field, event) => this.setState({ [field]: event.target.value });

  onSubmit = async event => {
    const { author, body } = this.state;
    const { postId, publish } = this.props;
    event.preventDefault();
    if (postId) {
      console.log("publish", postId, author, body);
      await publish({
        parentId: postId,
        author,
        body
      });
    }
    await this.setState({ submit: true, author: "", body: "" });
  };

  render() {
    const { author, body } = this.state;

    return (
      <div style={{ fontSize: 12, margin: 5 }}>
        <form onSubmit={this.onSubmit}>
          <label style={{ margin: 5 }}>
            Author:{" "}
            <input
              type="text"
              name="author"
              value={author || ""}
              autoComplete="off"
              onChange={event => this.onChange("author", event)}
            />
          </label>
          <br />
          <label style={{ margin: 5 }}>
            Comment:{" "}
            <input
              name="body"
              value={body}
              autoComplete="off"
              onChange={event => this.onChange("body", event)}
            />
          </label>
          <input type="submit" value="Publish" />
        </form>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({}),
  (dispatch, props) => ({
    publish: async comment => {
      dispatch(await action.publish(comment));
    }
  })
)(CommentForm);
