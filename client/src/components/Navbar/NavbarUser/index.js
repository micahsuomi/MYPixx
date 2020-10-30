import React from "react";

import { NavLink } from "react-router-dom";
import NavbarUserPhoto from "./NavbarUserPhoto/index";
import "./style.css";

const NavbarUser = ({ user, toggle }) => {
  return (
    <ul className="navbar-user">
      <li>
      <NavLink to="/addphoto">
        <i className="far fa-file-image fa-2x"></i>           
          </NavLink>
      </li>
      <li>
       
        <NavLink
          to={`/user/${user.id}`}
          className="user-link"
          activeStyle={{ color: "var(--secondary)" }}
          onClick={toggle}
        >
          {` ${user.name}`}

          <NavbarUserPhoto user={user} />
        </NavLink>
      </li>
    </ul>
  );
};

export default NavbarUser;
