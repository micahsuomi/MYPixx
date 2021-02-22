import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import NavbarUserPhoto from "./NavbarUserPhoto/index";

import "./style.scss";

const NavbarUser = ({ 
  user, 
  toggle 
}) => {
  return (
    <ul className="navbar-user">
      <li>
        <NavLink to="/addphoto" 
          onClick={toggle} 
          className="user-link grow2"
          activeStyle={{ color: "black" }}
          >
          <i className="fas fa-pen grow" title="add to gallery"></i>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/user/${user._id}`}
          className="user-link"
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
  toggle: PropTypes.func
};
