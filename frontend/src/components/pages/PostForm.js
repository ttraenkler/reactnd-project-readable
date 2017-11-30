import React, { Component } from "react";
import { connect } from "react-redux";
import type PostType from "../../client/state/post/types";

type Props = {
  categories: { name: string, path: string }[],
  post?: PostType
};

class PostForm extends Component {
  static props: Props;

  constructor(props) {
    super(props);
    const { post, categories } = this.props;
    this.state = {
      post: post
        ? post
        : { id: "", author: "", title: "", body: "", category: "" },
      categories
    };
  }

  componentWillReceiveProps(newProps) {
    const { post, categories } = this.newProps;
    this.setState({ post, categories });
  }

  onChange = (field, event) =>
    this.setState({ post: { [field]: event.target.value } });

  onSubmit = event => {
    console.log("event =", event);
    console.log("state =", this.state);
    if (this.props.post && this.props.post.id) {
      console.log("edit post", this.props.post.id);
    } else {
      console.log("create new post");
    }
    event.preventDefault();
  };

  // TODO: load categories data from server
  // TODO: prepopulate form when editing a post
  render() {
    console.log("state", this.state);
    const { post, categories } = this.state;
    const { author, title, body, category } = post;
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
              {categories.map(category => (
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

export default connect(state => ({ categories: state.categories }))(PostForm);
