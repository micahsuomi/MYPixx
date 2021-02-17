import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const AddPopup = ({ closePopup }) => {
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
          <h3>Photo Added!</h3>
        </div>
      </div>
    </div>
  );
};

export default AddPopup;

AddPopup.displayName = "EditPopup";
AddPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};
