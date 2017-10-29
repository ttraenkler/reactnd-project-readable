import React, { PureComponent } from "react";

class Categories extends PureComponent {
  render() {
    return (
      <p className="categories">
        {this.props.categories.map(category => `${category} `)}
      </p>
    );
  }
}

export default Categories;
