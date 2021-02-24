import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import PhotoItemAuthor from "./PhotoItemAuthor";
import PhotoItemLikes from "./PhotoItemLikes";
import PhotoItemComments from "./PhotoItemComments";

import "./style.scss";
import { useEffect } from "react";

const PhotoItem = ({
  id,
  title,
  image,
  author,
  authorId,
  authorImg,
  likes,
  comments,
  isUserPage,
}) => {
  const [detailsShowing, setDetailsShowing] = useState(false);
  const showDetails = () => {
    setDetailsShowing(true);
  };
  const hideDetails = () => {
    setDetailsShowing(false);
  };
  const checkWindowSize = () => {
    if (window.innerWidth < 1024) {
      setDetailsShowing(true);
    }
  };
  useEffect(() => {
    checkWindowSize();
  }, [checkWindowSize]);

  return (
    <div
      className="gallery-photo grow"
      onMouseEnter={window.innerWidth > 1024 ? showDetails : showDetails}
      onMouseLeave={window.innerWidth > 1024 ? hideDetails : showDetails}
    >
      {isUserPage ? (
        <NavLink
          to={`/view-user/${authorId}/user-photos/${id}`}
          className="view-photo__link"
        >
          <img src={image} alt={title} className="gallery-photo__image" />
        </NavLink>
      ) : (
        <NavLink to={`/photos/${id}`} className="view-photo__link">
          <img src={image} alt={title} className="gallery-photo__image" />
        </NavLink>
      )}

      {detailsShowing && (
        <div className="gallery-photo__body animate-appear">
          {!isUserPage && (
            <PhotoItemAuthor
              authorId={authorId}
              author={author}
              authorImg={authorImg}
            />
          )}

          {likes !== undefined && comments !== undefined && (
            <div className="gallery-photo__likes">
              <PhotoItemLikes id={id} likes={likes} />
              <PhotoItemComments id={id} comments={comments} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoItem;

PhotoItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
  authorId: PropTypes.string,
  authorImg: PropTypes.string,
  isUserPage: PropTypes.bool,
};
