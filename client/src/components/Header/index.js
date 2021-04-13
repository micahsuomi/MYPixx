import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Search from "../Search";

import "./style.scss";

const Header = ({ handleSubmit, handleChange, search, placeHolder }) => {
  const [scrolled, setScrolled] = useState(false);

  const changeHeader = () => {
    if (window.scrollY >= 50 || window.innerWidth <= 800) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  };
    
  useEffect(() => {
    changeHeader()
    window.addEventListener('scroll', changeHeader)
  });

  return (
    <div
      className={scrolled ? "header scrolled" : "header"}
      style={{
        height: `${search === "" && window.innerWidth > 1024 ? "81vh" : "23vh"}`,
        padding: `${search === "" && window.innerWidth > 1024 ? "9rem 2rem" : "1rem 2rem"}`,
      }}
    >
      <div className="header__wrapper">
        {search === "" ? (
          <div className="header__title">
            <h3>Discover the Best Artwork</h3>
          </div>
        ) : null}

        <Search
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          search={search}
          placeHolder={placeHolder}
          scrolled={scrolled}
        />
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  search: PropTypes.string,
  placeHolder: PropTypes.string
};
