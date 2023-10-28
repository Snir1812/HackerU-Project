import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        className="searchBarInput"
        placeholder="Search for products"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
