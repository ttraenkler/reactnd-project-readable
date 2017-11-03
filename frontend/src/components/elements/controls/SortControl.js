import React from "react";

const sortOptions = ["votes", "time"];

const SortControl = ({ onChange }) => (
  <div>
    Sorted by{" "}
    <select onChange={onChange}>
      {sortOptions.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SortControl;
