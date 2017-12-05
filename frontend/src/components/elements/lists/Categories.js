import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => (
  <p className="categories">
    Show topics:{" "}
    <Link key=" " to="/">
      All{" "}
    </Link>
    {categories.map(category => (
      <Link key={category.path} to={`/${category.path}`}>
        {category.name}{" "}
      </Link>
    ))}
  </p>
);

export default connect(state => ({ categories: state.categories }))(Categories);
