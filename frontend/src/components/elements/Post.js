import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import type PostType from "../../../state/posts";

type Props = {
  post: PostType
};

function formatDate(timestamp: number): string {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}

class Post extends PureComponent<Props> {
  render() {
    const {
      id,
      title,
      body,
      author,
      category,
      voteScore,
      timestamp
    } = this.props.data;
    return (
      <Link to={`/post/${id}`} className="post">
        <h2>{title}</h2>
        <p className="post-header">
          {author} {formatDate(timestamp)}
        </p>
        <p className="post-body">{body}</p>
        <p className="post-footer">
          {voteScore} &#128077; {category}
        </p>
      </Link>
    );
  }
}

export default Post;
