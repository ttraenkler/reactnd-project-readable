import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Posts from "./components/pages/Posts";
import PostDetails from "./components/pages/PostDetails";
import PostForm from "./components/pages/PostForm";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <h1>News</h1>
      <nav style={{ flexDirection: "row", justifyContent: "flex-start" }} />
      <div>
        <Route exact path="/" component={Posts} />
        <Route exact path="/:category" component={Posts} />
        <Route exact path="/:category/:id" component={PostDetails} />
        <Route path="/post/edit/:id" component={PostForm} />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
