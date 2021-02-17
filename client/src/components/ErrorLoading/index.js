import React from "react";
import PropTypes from "prop-types";

const ErrorLoading = ({ refreshPage }) => {
  return (
    <div className="error-container">
      <h3>Something went wrong. Click here to refresh the page</h3>
      <button onClick={refreshPage} className="btn-refresh grow">
        <i className="fas fa-redo-alt fa-2x"></i>
      </button>
    </div>
  );
};

export default ErrorLoading;
