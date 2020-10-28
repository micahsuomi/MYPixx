import React from "react";
import "./style.css";

const NavbarToggler = ({
  toggle,
  isClicked,
  borderToggleBarClicked,
  borderToggleBarUnclicked,
  lineClassOneActive,
  lineClassOne,
  lineClassTwoActive,
  lineClassTwo,
  lineClassThreeActive,
  lineClassThree,
}) => {
  return (
    <div className="toggle-wrapper">
      <div
        className="toggle-bar"
        onClick={toggle}
        style={isClicked ? borderToggleBarClicked : borderToggleBarUnclicked}
      >
        <span className={isClicked ? lineClassOneActive : lineClassOne}></span>
        <span className={isClicked ? lineClassTwoActive : lineClassTwo}></span>
        <span
          className={isClicked ? lineClassThreeActive : lineClassThree}
        ></span>
      </div>
    </div>
  );
};

export default NavbarToggler;
