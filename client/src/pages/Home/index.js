import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

const Home = () => {
  return (
    <div className="home animate-modal">
      <div className="home__wrapper">
        <h1 className="home__title">
          MYP<span className="lowercase">ixx</span>
        </h1>
        <h3 className="home__subtitle">An Online Community For Artists</h3>
        <NavLink to="/photos" className="home__gallery-link grow">
          View Gallery
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
