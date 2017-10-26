import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Post from "./components/pages/Post";
import PostForm from "./components/pages/PostForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <li>
            <Link to="/view">View</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
        </nav>
        <div style={{ margin: 25 }}>
          <Route exact path="/" component={Home} />
          <Route path="/view" component={Post} />
          <Route path="/post" component={PostForm} />
        </div>
      </div>
    );
  }
}

export default App;
