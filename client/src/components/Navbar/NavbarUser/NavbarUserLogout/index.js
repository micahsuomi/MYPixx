import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { logout } from "../../../../redux/actions/authActions";

import "./style.scss";

const NavbarUserLogout = ({ scrolled }) => {
  const dispatch = useDispatch();
  const logoutOnClick = () => {
    dispatch(logout());
  };

  return (
    <NavLink
      to="/"
      className={scrolled ? "navbar__link scrolled " : "navbar__link"}
      onClick={logoutOnClick}
    >
      <i className="fas fa-sign-out-alt" title="logout"></i>
      <span> Logout</span>
    </NavLink>
  );
};

export default NavbarUserLogout;

NavbarUserLogout.propTypes = {
  scrolled: PropTypes.bool,
};
