import React from "react";
import { Link } from "react-router-dom";

const PostControl = () => (
  <Link
    style={{
      width: 40,
      height: 40,
      backgroundColor: "red",
      color: "white",
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
    to="/post/edit/new"
  >
    +
  </Link>
);

export default PostControl;
