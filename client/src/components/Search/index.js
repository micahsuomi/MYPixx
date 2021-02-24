import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const Search = ({ search, handleSubmit, handleChange }) => {
  return (
    <div>
      <form
        className="search-form"
        onSubmit={(e) => handleSubmit(e.preventDefault())}
      >
        <input
          type="text"
          placeholder="search by title, author or type"
          value={search}
          onChange={handleChange}
        />
        <i className="fas fa-search"></i>
      </form>
    </div>
  );
};

export default Search;

Search.propTypes = {
  search: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};
