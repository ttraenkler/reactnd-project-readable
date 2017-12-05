import React from "react";
import { Link } from "react-router-dom";

type Props = { onClick: Function };

export default ({ id, onClick }: Props) => (
  <Link to={`/post/edit/${id}`}>
    <span onClick={onClick}>&#9998;</span>
  </Link>
);
