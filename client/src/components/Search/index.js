import React from "react";

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
      </form>
    </div>
  );
};

export default Search;
