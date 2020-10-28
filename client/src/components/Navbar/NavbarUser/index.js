import React from "react";

import { NavLink } from "react-router-dom";
import NavbarUserPhoto from "./NavbarUserPhoto/index";
import "./style.css";

const NavbarUser = ({ user, toggle }) => {
  return (
    <div>
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
    </div>
  );
};

export default NavbarUser;
