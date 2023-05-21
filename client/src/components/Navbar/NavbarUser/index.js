import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import NavbarUserPhoto from "./NavbarUserPhoto/index";

import "./style.scss";

const NavbarUser = ({ 
  user, 
  toggle,
  scrolled
}) => {
  return (
    <ul className="navbar-user">
      <li>
        <NavLink to="/addphoto" 
          onClick={toggle} 
          className={scrolled ? "navbar__link scrolled" : "navbar__link"}
          activeStyle={{ color: "black" }}
          >
          <i className="fas fa-pen grow" title="add to gallery"></i>
          <span> Add new</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/user/${user._id}`}
          className={scrolled ? "navbar__link nav-user-link scrolled " : "navbar__link nav-user-link"}
          activeStyle={{ color: "var(--secondary)" }}
          onClick={toggle}
        >
          <NavbarUserPhoto user={user} />
          <span>{user.name}</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavbarUser;

NavbarUser.propTypes = {
  user: PropTypes.object,
  toggle: PropTypes.func,
  scrolled: PropTypes.bool
};
