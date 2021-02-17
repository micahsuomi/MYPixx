import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.scss";

const PhotoItemLikes = ({ likes, id }) => {
  return (
    <div>
      {likes.length < 1 ? (
        <i
          className="far fa-heart empty-heart grow"
          style={{ margin: ".5rem" }}
        ></i>
      ) : (
        <NavLink to={`/photos/${id}/likes`} className="likes-link__num">
          <i className="fas fa-heart full-heart grow">
            <span className="likes-num">{likes.length}</span>
          </i>
        </NavLink>
      )}
    </div>
  );
};

export default PhotoItemLikes;

PhotoItemLikes.propTypes = {
  likes: PropTypes.array,
  id: PropTypes.string,
};
