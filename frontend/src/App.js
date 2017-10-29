import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Root from "./components/pages/Root";
import Post from "./components/pages/Post";
import PostForm from "./components/pages/PostForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Readable</h1>
        <nav style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Link to="/view">View</Link> <Link to="/post">Post</Link>
        </nav>
        <div>
          <Route exact path="/" component={Root} />
          <Route path="/view" component={Post} />
          <Route path="/post" component={PostForm} />
        </div>
      </div>
    );
  }
}

export default App;
