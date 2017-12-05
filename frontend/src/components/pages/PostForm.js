import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import type PostType from "../../client/state/post/types";
import { post, category } from "../../client";

const action = { post, category };

export type Props = {
  postId: string,
  categories: { name: string, path: string }[],
  post?: PostType
};

export class PostForm extends Component {
  static props: Props;

  constructor(props) {
    super(props);
    if (props.post) {
      const { id, author, title, body, category } = props.post;
      this.state = {
        id,
        author,
        title,
        body,
        category,
        submit: false
      };
    } else {
      this.state = {
        id: "",
        author: "",
        title: "",
        body: "",
        category: ""
      };
    }
  }

  async componentWillMount() {
    await this.props.load(this.props.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post) {
      const { id, author, title, body, category } = newProps.post;
      this.setState({
        id,
        author,
        title,
        body,
        category
      });
    }
  }

  onChange = (field, event) => this.setState({ [field]: event.target.value });

  onSubmit = async event => {
    const { id, author, title, body, category } = this.state;
    event.preventDefault();
    if (this.props.id) {
      await this.props.edit(id, { title, body });
    } else {
      await this.props.publish({
        author,
        title,
        body,
        category
      });
    }
    await this.setState({ submit: true });
  };

  // TODO: load categories data from server
  // TODO: prepopulate form when editing a post
  render() {
    const { author, title, body, category, submit } = this.state;
    if (submit) {
      return <Redirect to="/" push />;
    }
    console.log("render state", this.state);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Author:<br />
            <input
              type="text"
              name="author"
              autoComplete="off"
              value={author || ""}
              onChange={event => this.onChange("author", event)}
            />
          </label>
          <br />
          <label>
            Title:<br />
            <input
              type="text"
              name="title"
              autoComplete="off"
              value={title || ""}
              onChange={event => this.onChange("title", event)}
            />
          </label>
          <br />
          <label>
            Text:<br />
            <textarea
              name="body"
              cols="40"
              rows="5"
              autoComplete="off"
              value={body || ""}
              onChange={event => this.onChange("body", event)}
            />
          </label>
          <br />
          <label>
            Category:<br />
            <select
              name="categories"
              value={category || ""}
              onChange={event => this.onChange("category", event)}
            >
              <option key="-" value="-">
                -
              </option>
              {this.props.categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <div style={{ marginTop: "15px" }}>
            <input type="submit" value="Publish" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    id:
      ownProps.match.params.id === "new" ? undefined : ownProps.match.params.id,
    categories: state.categories,
    post: state.posts[ownProps.match.params.id]
  }),
  dispatch => ({
    load: async (id: string) => {
      dispatch(await action.post.load(id));
      dispatch(await action.category.load());
    },
    edit: async (postId: string, post) => {
      dispatch(await action.post.edit(postId, post));
    },
    publish: async post => {
      dispatch(await action.post.publish(post));
    }
  })
)(PostForm);
