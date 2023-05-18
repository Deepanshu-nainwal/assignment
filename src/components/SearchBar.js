import React from "react";
import "./SearchBar.css";
function SearchBar(props) {
  return (
    <div className="search_div">
      <p className="search_input_text">Find your Lawyer</p>
      <input
        className="search_input"
        placeholder="Search"
        type="text"
        onChange={props.findLawyer}
      />
    </div>
  );
}
export default SearchBar;
