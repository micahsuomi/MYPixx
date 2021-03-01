import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { getPhotos } from "../../redux/actions/photoActions";
import { likePhoto } from "../../redux/actions/photoActions";

import "./style.scss";

const LikePhoto = ({
  filteredPhoto,
  history,
  match
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const { likes } = filteredPhoto;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = match.params.id;
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      const likedPhoto = filteredPhoto;
      dispatch(likePhoto(likedPhoto, id));

      setTimeout(() => {
        dispatch(getPhotos());
      }, 1000);
    }
  };

  return (
    <div>
      <form className="like-container" onSubmit={handleSubmit}>
        {isAuthenticated &&
        likes.some((like) => like._id === user._id) ? (
          <button className="like-btn">
            <i className="fas fa-heart full-heart fa-2x grow2"></i>
          </button>
        ) : (
          <button className="like-btn">
            <i className="far fa-heart empty-heart fa-2x grow2"></i>
          </button>
        )}
        {likes.length > 0 ? (
          <NavLink
            to={`/photo/${match.params.id}/likes`}
            className="likes-number grow"
          >
            {likes.length}
            {likes.length === 1 ? (
              <span> Like</span>
            ) : (
              <span> Likes</span>
            )}
          </NavLink>
        ) : null}
      </form>
    </div>
  );
};

export default LikePhoto;

LikePhoto.propTypes = {
  filteredPhoto: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
};