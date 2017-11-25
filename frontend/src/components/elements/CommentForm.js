import React, { Component } from "react";

export default class CommentForm extends Component {
  state = {
    author: "",
    body: ""
  };

  onChange = (field, event) => this.setState({ [field]: event.target.value });
  onSubmit = event => {
    console.log("event =", event);
    console.log("state =", this.state);
    event.preventDefault();
  };

  render() {
    return (
      <div style={{ fontSize: 12, margin: 5 }}>
        <form onSubmit={this.onSubmit}>
          <label style={{ margin: 5 }}>
            <input
              name="body"
              value={this.state.body}
              onChange={event => this.onChange("body", event)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
