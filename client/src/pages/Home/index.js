import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { logs, agents, resolutions } from "../../validators";

import "./style.scss";

const Home = () => {
  console.log(logs, agents, resolutions);
  const [agent, setAgent] = useState({
    name: "",
    callNumber: "",
    resolution: "",
  });
  const connectData = () => {
    logs.forEach((l) => {
      agents.forEach((a) => {
        resolutions.forEach((r) => {
          if (
            l.agentIdentifier.match(a.identifier) &&
            l.identifier.match(r.identifier)
          ) {
            console.log(
              "these are mathing",
              "agent id",
              l.agentIdentifier,
              "log id",
              l.agentIdentifier
            );
            console.log(
              "these are mathing",
              "log id",
              l.identifier,
              "resolution id",
              r.identifier
            );
          }
        });
      });
    });
    console.log(logs);
    console.log(agents);
    console.log(resolutions);
  };
  useEffect(() => {
    connectData();
  }, []);
  return (
    <div className="home">
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
