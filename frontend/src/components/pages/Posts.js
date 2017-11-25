import React, { Component } from "react";
import { connect } from "react-redux";
import { Categories, Posts, PostControl, SortControl } from "../elements";
import { load } from "../../client";

export class PostsPage extends Component {
  state = {
    sortBy: "votes"
  };

  componentWillMount() {
    this.props.load();
  }

  onChange = e => {
    this.setState({ sortBy: e.target.value });
  };

  render() {
    const { categories, posts, match } = this.props;
    // TODO: load posts for category only?
    return (
      <div>
        <div style={{ marginBottom: "30px" }}>
          <Categories categories={categories} />
          <SortControl onChange={e => this.onChange(e)} />
        </div>
        <Posts
          posts={posts}
          category={match.params.id}
          sortBy={this.state.sortBy}
        />
        <PostControl />
      </div>
    );
  }
}

export default connect(
  state => ({ categories: state.categories, posts: state.posts }),
  dispatch => ({
    load: async () => {
      dispatch(await load.posts());
      dispatch(await load.categories());
    }
  })
)(PostsPage);
