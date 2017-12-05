import React, { Component } from "react";
import { connect } from "react-redux";
import { Categories, Posts, PostControl, SortControl } from "../elements";
import { post, category } from "../../client";

export class PostsPage extends Component {
  state = {
    sortBy: "votes",
    loaded: false
  };

  componentDidMount() {
    this.props.load();
    this.setState({ loaded: true });
  }

  onChange = e => {
    this.setState({ sortBy: e.target.value });
  };

  render() {
    const { categories, posts, match } = this.props;
    return this.state.loaded ? (
      <div>
        <div style={{ marginBottom: "30px" }}>
          <Categories categories={categories} />
          <SortControl onChange={e => this.onChange(e)} />
        </div>
        <Posts
          posts={posts}
          category={match.params.category}
          sortBy={this.state.sortBy}
        />
        <PostControl />
      </div>
    ) : null;
  }
}

export default connect(
  state => ({ categories: state.categories, posts: state.posts }),
  dispatch => ({
    load: async () => {
      dispatch(await post.load());
      dispatch(await category.load());
    }
  })
)(PostsPage);
