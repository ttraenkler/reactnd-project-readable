import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Categories, Posts, PostControl, SortControl } from "../elements";
import PostForm from "./PostForm";

export class PostsPage extends Component {
  state = {
    sortBy: "votes",
    showModal: true
  };

  onChange = e => {
    this.setState({ sortBy: e.target.value });
  };

  closeModal = () => this.setState({ showModal: false });

  render() {
    const { categories, match } = this.props;
    return (
      <div>
        <Categories categories={categories} />
        <SortControl onChange={e => this.onChange(e)} />
        <Posts category={match.params.id} sortBy={this.state.sortBy} />
        <PostControl />
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <PostForm />
          <button onClick={this.closeModal}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}

export default connect(state => ({ categories: state.categories }))(PostsPage);
