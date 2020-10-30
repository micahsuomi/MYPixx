import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-wrapper">
        <h1 className="title">
          MYP<span className="lowercase">ixx</span>
        </h1>
        <h3 className="subtitle">A Social Photo Gallery App</h3>
        <NavLink to="/photos" className="nav-gallery__link grow">
          View Gallery
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
