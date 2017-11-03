import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Posts from "./components/pages/Posts";
import PostDetails from "./components/pages/PostDetails";
import PostForm from "./components/pages/PostForm";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Readable</h1>
          <nav style={{ flexDirection: "row", justifyContent: "flex-start" }} />
          <div>
            <Route exact path="/" component={Posts} />
            <Route path="/category/:id" component={Posts} />
            <Route path="/post/:id" component={PostDetails} />
            <Route path="/new" component={PostForm} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
