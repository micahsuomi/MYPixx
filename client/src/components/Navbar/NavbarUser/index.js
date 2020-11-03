import React from "react";
import { NavLink } from "react-router-dom";

import NavbarUserPhoto from "./NavbarUserPhoto/index";

import "./style.scss";

const NavbarUser = ({ user, toggle }) => {
  return (
    <ul className="navbar-user">
      <li>
        <NavLink to="/addphoto">
          <i className="fas fa-pen grow" title="add to gallery"></i>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/user/${user.id}`}
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
