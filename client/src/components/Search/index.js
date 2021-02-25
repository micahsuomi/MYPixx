import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const Search = ({ search, handleSubmit, handleChange, scrolled }) => { 
  return (
      <form
        className={scrolled ? "search-form scrolled" : "search-form"}
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
  );
};

export default Search;

Search.propTypes = {
  search: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  scrolled: PropTypes.bool
};
