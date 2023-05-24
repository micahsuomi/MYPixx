import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const CommunityMostCommented = ({ image, title, author, comments }) => {
  console.log("name", )
  return (
    <div className="photo-sorted grow">
      <div className="photo-sorted__image-container">
        <img src={image} alt={title} />
      </div>
      <h4>{title}</h4>
      <h5>{author.name}</h5>
      <div className="photo-sorted__comments">
        {comments.length < 1 ? (
          <i className="far fa-comments comments-icon"></i>
        ) : (
          <div className="photo-sorted__comments">
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

CommunityMostCommented.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  author: PropTypes.object,
  comments: PropTypes.array
};

export default CommunityMostCommented;
