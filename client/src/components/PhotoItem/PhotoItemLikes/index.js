import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./style.scss";

const PhotoItemLikes = ({ likes, id }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      {likes.length > 0 ? (
        <>
          {isAuthenticated && likes.some((like) => like._id === user._id) ? (
            <NavLink to={`/photos/${id}/likes`} className="likes-link-small">
              <i className="fas fa-heart full-heart grow">
                <span>{likes.length}</span>
              </i>
            </NavLink>
          ) : (
            <NavLink to={`/photos/${id}/likes`} className="likes-link-small">
              <i className="far fa-heart empty-heart grow">
                <span>{likes.length}</span>
              </i>
            </NavLink>
          )}
        </>
      ) : (
        <i
          className="far fa-heart empty-heart grow likes-small-empty"
          style={{ margin: ".5rem", color: "white" }}
        ></i>
      )}
    </div>
  );
};

export default PhotoItemLikes;

PhotoItemLikes.propTypes = {
  likes: PropTypes.array,
  id: PropTypes.string,
};
