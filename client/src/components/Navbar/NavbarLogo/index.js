import React from "react";

import { NavLink } from "react-router-dom";
import "./style.scss";

const NavbarLogo = () => {
  return (
    <NavLink exact to="/" className="logo" title=" home">
      MYPixx
    </NavLink>
  );
};

export default NavbarLogo;
