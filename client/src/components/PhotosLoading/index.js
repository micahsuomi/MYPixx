import React from "react";

import "./style.scss";

const PhotosLoading = () => {
  return (
    <div className="loading-container">
      <h1>Loading Gallery Items...</h1>
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
};

export default PhotosLoading;
