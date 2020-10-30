import React from "react";

import { NavLink } from "react-router-dom";
import "./style.css";

const AddPhotoButton = () => {
  return (
      <NavLink to="/addphoto" className="add-photo-link">
      <i class="fas fa-plus fa-2x"></i>
        <span className="add">Add New</span>
      </NavLink>
  );
};

export default AddPhotoButton;
