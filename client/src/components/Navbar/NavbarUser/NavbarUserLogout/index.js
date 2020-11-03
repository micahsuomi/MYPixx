import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout } from "../../../../redux/actions/authActions";

import "./style.scss";

const NavbarUserLogout = () => {
  const dispatch = useDispatch();
  const logoutOnClick = () => {
    dispatch(logout());
  };

  return (
    <NavLink to="/" className="navbar-link" onClick={logoutOnClick}>
      <i className="fas fa-sign-out-alt nav-list__icon" title="logout">
        <span> Logout</span>
      </i>
    </NavLink>
  );
};

export default NavbarUserLogout;
