import React from "react";

import "./style.scss";

const Loader = () => {
  return (
    <div className="loading-container">
      <h1>Loading...</h1>
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
