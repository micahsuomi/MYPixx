import React from "react";

import { NavLink } from "react-router-dom";

import "./style.scss";

const NavbarUserLogin = ({ toggle }) => {
  return (
    <NavLink
      to="/login"
      className="navbar-link login-link"
      activeStyle={{ color: "black" }}
      onClick={toggle}
    >
      <i className="fas fa-sign-in-alt nav-list__icon grow" title="login">
        <span> Login</span>
      </i>
    </NavLink>
  );
};

export default NavbarUserLogin;
