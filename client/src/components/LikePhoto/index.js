import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getPhotos } from "../../redux/actions/photoActions";
import { likePhoto } from "../../redux/actions/photoActions";

import "./style.css";

const LikePhoto = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    if (isAuthenticated === null) {
      props.history.push("/login");
    } else {
      const likedPhoto = props.filteredPhoto;
      dispatch(likePhoto(likedPhoto, id));

      setTimeout(() => {
        dispatch(getPhotos());
      }, 1000);
    }
  };

  /*
  let likedPhoto;
  if (isAuthenticated) {
    likedPhoto = props.filteredPhoto.likes.some((like) => like._id === user.id);
  }

  isAuthenticated &&
    props.filteredPhoto.likes.some((like) => like._id === user.id);*/
  return (
    <div>
      <form className="like-container" onSubmit={handleSubmit}>
        {isAuthenticated &&
        props.filteredPhoto.likes.some((like) => like._id === user.id) ? (
          <button className="like-btn">
            <i className="fas fa-heart full-heart fa-2x grow"></i>
          </button>
        ) : (
          <button className="like-btn">
            <i className="far fa-heart empty-heart fa-2x grow"></i>
          </button>
        )}
        {props.filteredPhoto.likes.length > 0 ? (
          <NavLink
            to={`/photos/${props.match.params.id}/likes`}
            className="likes-number grow"
          >
            {props.filteredPhoto.likes.length}
            {props.filteredPhoto.likes.length === 1 ? (
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
