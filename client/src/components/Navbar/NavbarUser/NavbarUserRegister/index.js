import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { activeStyle, activeStyleScrolled } from "../../../../utils/navStyles";

const NavbarUserRegister = ({ toggle, scrolled }) => {
  return (
    <NavLink
      to="/register"
      className={scrolled ? "navbar__link scrolled " : "navbar-link"}
      activeStyle={scrolled ? activeStyleScrolled : activeStyle}
      onClick={toggle}
    >
      <i className="fas fa-user-plus grow" title="register">
        <span> Register</span>
      </i>
    </NavLink>
  );
};

export default NavbarUserRegister;

NavbarUserRegister.propTypes = {
  toggle: PropTypes.func,
  scrolled: PropTypes.bool,
};
