import React from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../../../redux/actions/authActions";
import { NavLink } from "react-router-dom";
import "./style.css";

const NavbarUserLogout = () => {
  const dispatch = useDispatch();
  const logoutOnClick = () => {
    dispatch(logout());
  };

  return (
    <NavLink to="/" className="navbar-link" onClick={logoutOnClick}>
      <i className="fas fa-sign-out-alt nav-list__icon" title="logout">
        {/* <span> Logout</span>*/}
      </i>
    </NavLink>
  );
};

export default NavbarUserLogout;
