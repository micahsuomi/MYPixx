import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import PhotoItemAuthor from "./PhotoItemAuthor";
import PhotoItemLikes from "./PhotoItemLikes";
import PhotoItemComments from "./PhotoItemComments";

import "./style.scss";

const PhotoItem = ({
  id,
  title,
  image,
  author,
  authorId,
  authorImg,
  isUserPage,
  likes,
  comments,
}) => {
  console.log('user page', isUserPage)
  return (
    <div className="gallery-photo grow">
      <NavLink to={`/photos/${id}`} className="view-photo__link">
        <img src={image} alt={title} className="gallery-photo__image" />
      </NavLink>
      <div className="gallery-photo__body">
        {isUserPage ? (
          ""
        ) : (
          <PhotoItemAuthor
            authorId={authorId}
            author={author}
            authorImg={authorImg}
          />
        )}

        {likes !== undefined && comments !== undefined ? (
          <div className="gallery-photo__likes">
            <PhotoItemLikes id={id} likes={likes} />
            <PhotoItemComments id={id} comments={comments} />
          </div>
        ) : null}
      </div>
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

