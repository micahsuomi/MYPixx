import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import NavbarLogo from "./NavbarLogo/index";
import NavbarUser from "./NavbarUser/index";
import NavbarUserRegister from "./NavbarUser/NavbarUserRegister/index";
import NavbarUserLogin from "./NavbarUser/NavbarUserLogin/index";
import NavbarUserLogout from "./NavbarUser/NavbarUserLogout/index";
import {
  activeStyle,
  activeStyleScrolled
} from "../../utils/navStyles"

import "./style.scss";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const [isClicked, setState] = useState(false);
  const navList = "nav-list";
  const navListOpen = "nav-list open";
  const [scrolled, setScrolled] = useState(false);
 
  const toggle = () => {
    setState(!isClicked);
  };

  const changeBackground = () => {
    if (window.scrollY >= 50 || window.innerWidth <= 800) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  };

  useEffect(() => {
    changeBackground()
    window.addEventListener('scroll', changeBackground)
  });

  return (
    <div className={scrolled ? "navbar active" : "navbar"}>
      <NavbarLogo />
      <ul className={isClicked ? navListOpen : navList}>
        <li>
          <NavLink
            to="/"
            className={scrolled ? "navbar-link scrolled" : "navbar-link"}
            activeStyle={scrolled ? activeStyleScrolled : activeStyle}
            onClick={toggle}
          >
            <i className="fas fa-home grow" title="home">
            </i>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community"
            className={scrolled ? "navbar-link scrolled" : "navbar-link"}
            activeStyle={scrolled ? activeStyleScrolled : activeStyle}
            onClick={toggle}
          >
            <i className="fas fa-users grow" title="community">
            </i>
            <span> Community</span>
          </NavLink>
        </li>
        {isAuthenticated && user && (
          <NavbarUser user={user} toggle={toggle}
           scrolled={scrolled} />
        )}
        <li>
          {isAuthenticated && user ? (
            <NavbarUserLogout toggle={toggle}
             scrolled={scrolled} />
          ) : (
            <ul className="register-login">
              <li>
                <NavbarUserRegister toggle={toggle}
                 scrolled={scrolled} />
              </li>
              <li className="login">
                <NavbarUserLogin toggle={toggle}
                 scrolled={scrolled} />
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
