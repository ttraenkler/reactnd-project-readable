import React from "react";
import { Categories, Posts, PostControl, SortControl } from "../elements";
import { posts } from "../../data/posts";

const categories = ["iPhone", "Google"];

const Home = () => (
  <div>
    <Categories categories={categories} />
    <Posts posts={posts} />
    <PostControl />
    <SortControl />
  </div>
);

export default Home;
