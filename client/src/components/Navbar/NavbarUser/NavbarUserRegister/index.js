import React from "react";

import { NavLink } from "react-router-dom";

const NavbarUserRegister = ({ toggle }) => {
  return (
    <NavLink
      to="/register"
      className="navbar-link user-link"
      activeStyle={{ color: "black" }}
      onClick={toggle}
    >
      <i className="fas fa-user-plus nav-list__icon grow" title="register">
        <span> Register</span>
      </i>
    </NavLink>
  );
};

export default NavbarUserRegister;
