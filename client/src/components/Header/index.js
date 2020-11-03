import React from "react";

import Search from "../Search";

import "./style.scss";

const Header = ({ handleSubmit, handleChange, search, placeHolder }) => {
  return (
    <div
      className="header"
      style={{
        height: `${search === "" ? "65vh" : "27vh"}`,
        padding: `${search === "" ? "9rem 2rem" : "3rem 2rem"}`,
      }}
    >
      <div className="header__wrapper">
        {search === "" ? (
          <div className="header__title">
            <h3>Discover the Best Artwork</h3>
          </div>
        ) : null}

        <Search
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          search={search}
          placeHolder={placeHolder}
        />
      </div>
    </div>
  );
};

export default Header;
