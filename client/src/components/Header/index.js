import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Search from "../Search";
import { useMediaQueries } from "../../hooks/useMediaQueries";
import NavbarLogo from "../Navbar/NavbarLogo";

import "./style.scss";

const Header = ({ handleSubmit, handleChange, search, placeHolder }) => {
  const [scrolled, setScrolled] = useState(false);
  const { isTablet } = useMediaQueries();
  const adjustHeaderHeight = useCallback(
    () => {
      setScrolled(window.scrollY > 50)
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('scroll', adjustHeaderHeight)
    return () => {
      window.removeEventListener("scroll", adjustHeaderHeight)
    }
  }, [adjustHeaderHeight])
  
  return (
    <div
      className={scrolled ? "header scrolled" : "header"}
      style={{
        height: `${search === "" && !isTablet ? "100%" : "fit-content"}`,
        padding: `${search === "" && !isTablet ? "7rem 2rem" : "0"}`,
      }}
    >
      <div className="header__wrapper">
        {
          isTablet &&
          <NavbarLogo />
        }
        {search === ""  && window.innerWidth > 1024 ? (
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
