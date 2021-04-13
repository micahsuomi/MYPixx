import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

const AddPhotoButton = () => {
  return (
    <NavLink to="/addphoto" className="add-photo-link">
      <i className="fas fa-plus"></i>
      <span className="add">Add New</span>
    </NavLink>
  );
};

export default AddPhotoButton;
