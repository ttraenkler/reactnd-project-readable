import React, { Component } from "react";
import { connect } from "react-redux";
import type PostType from "../../client/state/post/types";
import { post } from "../../client";

type Props = {
  postId: string,
  categories: { name: string, path: string }[],
  post?: PostType
};

class PostForm extends Component {
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
        category
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

  componentWillMount() {
    this.props.load(this.props.id);
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

  onSubmit = event => {
    console.log("event =", event);
    console.log("state =", this.state);
    if (this.props.id) {
      this.props.edit();
    } else {
      this.props.create();
    }
    event.preventDefault();
  };

  // TODO: load categories data from server
  // TODO: prepopulate form when editing a post
  render() {
    console.log("props", this.props, "state", this.state);
    const { author, title, body, category } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Author:<br />
            <input
              type="text"
              name="author"
              value={author}
              onChange={event => this.onChange("author", event)}
            />
          </label>
          <br />
          <label>
            Title:<br />
            <input
              type="text"
              name="title"
              value={title}
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
              value={body}
              onChange={event => this.onChange("body", event)}
            />
          </label>
          <br />
          <label>
            Category:<br />
            <select
              name="categories"
              value={category}
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
            <input type="submit" />
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
      console.log("load post", id, "+ categories");
    },
    edit: async (postId: string, post) => {
      console.log("edit post");
      post.edit(postId, post.title, post.body);
    },
    create: async () => {
      console.log("create new post");
    }
  })
)(PostForm);
