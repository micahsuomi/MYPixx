import React from "react";

import { NavLink } from "react-router-dom";

const PhotoItemComments = ({ comments, id }) => {
  return (
    <div>
      {comments.length < 1 ? (
        <i className="far fa-comments comments-icon"></i>
      ) : (
        <NavLink to={`/photos/${id}/comments`} className="comments-link__num">
          <i className="fas fa-comments comments-icon">
            <span className="comments-num">{comments.length}</span>
          </i>
        </NavLink>
      )}
    </div>
  );
};

export default PhotoItemComments;
