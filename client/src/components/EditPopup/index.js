import React from "react";
import PropTypes from "prop-types";

import "./style.css";

const EditPopup = ({ closePopup }) => {
  return (
    <div className="photo-added__popup__container">
      <div className="photo-added__popup">
        <div className="photo-added__popup__header">
          <i
            className="fas fa-times-circle fa-2x grow"
            onClick={closePopup}
          ></i>
        </div>
        <div className="photo-added__popup__body">
          <h3>Photo Edited!</h3>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;

EditPopup.displayName = "EditPopup";
EditPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};
