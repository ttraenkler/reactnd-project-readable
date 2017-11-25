import React, { Component } from "react";
import { connect } from "react-redux";

class PostForm extends Component {
  static props: {
    categories: any[]
  };
  state = { author: "", title: "", body: "", category: "" };
  onChange = (field, event) => this.setState({ [field]: event.target.value });
  onSubmit = event => {
    console.log("event =", event);
    console.log("state =", this.state);
    event.preventDefault();
  };

  // TODO: load categories data from server
  // TODO: prepopulate form when editing a post
  render() {
    const { categories } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Author:<br />
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={event => this.onChange("author", event)}
            />
          </label>
          <br />
          <label>
            Title:<br />
            <input
              type="text"
              name="title"
              value={this.state.title}
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
              value={this.state.body}
              onChange={event => this.onChange("body", event)}
            />
          </label>
          <br />
          <label>
            Category:<br />
            <select
              name="categories"
              value={this.state.category}
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
