import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import NavbarLogo from "./NavbarLogo/index";
import NavbarUser from "./NavbarUser/index";
import NavbarUserRegister from "./NavbarUser/NavbarUserRegister/index";
import NavbarUserLogin from "./NavbarUser/NavbarUserLogin/index";
import NavbarUserLogout from "./NavbarUser/NavbarUserLogout/index";

import "./style.scss";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const [isClicked, setState] = useState(false);
  const navList = "nav-list";
  const navListOpen = "nav-list open";
 
  const toggle = () => {
    setState(!isClicked);
  };

  return (
    <div className="navbar">
      <NavbarLogo />
      <ul className={isClicked ? navListOpen : navList}>
        <li>
          <NavLink
            exact
            to="/"
            className="navbar-link"
            activeStyle={{ color: "black" }}
            onClick={toggle}
          >
            <i className="fas fa-home nav-list__icon grow" title="home">
              <span> Home</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community"
            className="navbar-link"
            activeStyle={{ color: "black" }}
            onClick={toggle}
          >
            <i className="fas fa-users nav-list__icon grow" title="community">
              <span> Community</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/photos"
            className="navbar-link"
            activeStyle={{ color: "black" }}
            onClick={toggle}
          >
            <i
              className="fas fa-images nav-list__icon grow"
              title="photo gallery"
            >
              <span> Gallery</span>
            </i>
          </NavLink>
        </li>
        {isAuthenticated && user ? (
          <NavbarUser user={user} toggle={toggle} />
        ) : null}
        <li>
          {isAuthenticated && user ? (
            <NavbarUserLogout toggle={toggle} />
          ) : (
            <ul className="register-login">
              <li>
                <NavbarUserRegister toggle={toggle} />
              </li>
              <li className="login">
                <NavbarUserLogin toggle={toggle} />
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
