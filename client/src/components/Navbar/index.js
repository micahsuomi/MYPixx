import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import NavbarLogo from "./NavbarLogo/index";
import NavbarUser from "./NavbarUser/index";
import NavbarUserRegister from "./NavbarUser/NavbarUserRegister/index";
import NavbarUserLogin from "./NavbarUser/NavbarUserLogin/index";
import NavbarUserLogout from "./NavbarUser/NavbarUserLogout/index";
import { activeStyle, activeStyleScrolled } from "../../utils/navStyles";
import { useMediaQueries } from "../../hooks/useMediaQueries"

import "./style.scss";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const [isClicked, setState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const { isTablet } = useMediaQueries();

  const toggle = () => {
    setState(!isClicked);
  };

  const changeBackground = () => {
    if (window.scrollY >= 50 || window.innerWidth <= 800) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    if(window.location.pathname !== "/") {
      setIsHomePage(false);
    }
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    }
  }, []);

  return (
    <nav className={scrolled ? "navbar active" : `navbar`}>
      {
        !isTablet &&
        <NavbarLogo />
      }
      <div className="navbar__list-wrapper">
      <ul className="navbar__list-left">
        <li>
          <NavLink
            to="/"
            className={scrolled ? "navbar__link scrolled" : `navbar__link${isHomePage ? "--home" : ""}`}
            activeStyle={scrolled ? activeStyleScrolled : activeStyle}
            onClick={toggle}
          >
            <i className="fas fa-home grow" title="home"></i>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community"
            className={scrolled ? "navbar__link scrolled" : `navbar__link ${isHomePage ? "navbar__link--home" : ""}`}
            activeStyle={scrolled ? activeStyleScrolled : activeStyle}
            onClick={toggle}
          >
            <i className="fas fa-users grow" title="community"></i>
            <span> Community</span>
          </NavLink>
        </li>
        </ul>
        <ul className="navbar__list-right">
        {isAuthenticated && user ? (
          <>
            <li>
              <NavbarUser user={user} toggle={toggle} scrolled={scrolled} />
            </li>
            <li>
              <NavbarUserLogout toggle={toggle} scrolled={scrolled} />
            </li>
          </>
        ) : (
          <>
            <li>
              <NavbarUserRegister toggle={toggle} scrolled={scrolled} />
            </li>
            <li>
              <NavbarUserLogin toggle={toggle} scrolled={scrolled} />
            </li>
          </>
        )}
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
