import React from "react";

import "./style.scss";

const CommunityMostCommented = ({ image, name, author, comments }) => {
  return (
    <div className="photo-sorted grow">
      <div className="photo-sorted__image-container">
        <img src={image} alt={name} />
      </div>
      <h4>{name}</h4>
      <h5>{author.name}</h5>
      <div className="photo-sorted__likes">
        {comments.length < 1 ? (
          <i className="far fa-comments comments-icon"></i>
        ) : (
          <div className="comments-num__container">
            <i className="far fa-comments comments-icon"></i>
            <div className="comments-length">{comments.length}</div>
            {comments.length === 1 ? (
              <span> Comment</span>
            ) : (
              <span> Comments</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityMostCommented;
