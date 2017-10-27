import React from "react";
import { Categories, Posts, PostControl, SortControl } from "../elements";
import type PostType from "../../../state/posts";

const posts: PostType[] = [
  {
    id: 1,
    timestamp: Date.now(),
    title: "React 16 released",
    body: "After years of development, finally today React 16 was released",
    author: "author",
    category: "React",
    voteScore: 13,
    deleted: false
  },
  {
    id: 1,
    timestamp: Date.now(),
    title: "Redux monolog",
    body: "The monolog logs actions into a file",
    author: "author",
    category: "Redux",
    voteScore: 13,
    deleted: false
  }
];

const Home = () => (
  <div>
    <Categories categories={["React", "Redux"]} />
    <Posts posts={posts} />
    <PostControl />
    <SortControl />
  </div>
);

export default Home;
