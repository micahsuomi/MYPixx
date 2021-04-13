import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.scss";

const PhotoItemComments = ({ comments, id }) => {
  return (
    <div>
      {comments.length < 1 ? (
        <i className="far fa-comments comments-icon"></i>
      ) : (
        <NavLink to={`/photos/${id}/comments`} className="comments-link-small">
          <i className="fas fa-comments comments-icon">
            <span>{comments.length}</span>
          </i>
        </NavLink>
      )}
    </div>
  );
};

export default PhotoItemComments;

PhotoItemComments.propTypes = {
  comments: PropTypes.array,
  id: PropTypes.string,
};
