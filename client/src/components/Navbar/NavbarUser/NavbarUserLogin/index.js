import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import {
  activeStyle,
  activeStyleScrolled
} from "../../../../utils/navStyles";

import './style.scss'

const NavbarUserLogin = ({ toggle, scrolled }) => {
  return (
    <NavLink
      to="/login"
      className={scrolled ? "navbar__link scrolled " : "navbar-link"}
      activeStyle={scrolled ? activeStyleScrolled : activeStyle}
      onClick={toggle}
    >
      <i className="fas fa-sign-in-alt grow" title="login">
      </i>
      <span>Login</span>
    </NavLink>
  );
};

export default NavbarUserLogin;

NavbarUserLogin.propTypes = {
  toggle: PropTypes.func,
  scrolled: PropTypes.bool
};
