import React from "react";
import { NavLink } from "react-router-dom";

import PhotoItemAuthor from "./PhotoItemAuthor";
import PhotoItemLikes from "./PhotoItemLikes";
import PhotoItemComments from "./PhotoItemComments";

import "./style.scss";

const PhotoItem = (props) => {
  let {
    id,
    title,
    image,
    author,
    authorId,
    authorImg,
    isUserPage,
    likes,
    comments,
  } = props;

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
