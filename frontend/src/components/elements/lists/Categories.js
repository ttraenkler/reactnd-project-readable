import React, { PureComponent } from "react";

class Categories extends PureComponent {
  render() {
    return this.props.categories.map(category => `${category} `);
  }
}

export default Categories;
