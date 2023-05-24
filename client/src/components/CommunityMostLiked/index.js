import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const CommunityMostLiked = ({ image, title, author, likes }) => {
  return (
    <div className="photo-sorted grow">
      <div className="photo-sorted__image-container">
        <img src={image} alt={title} />
      </div>
      <h4>{title}</h4>
      <h5>{author.name}</h5>
      <p className="photo-sorted__likes">
        <i className="fas fa-heart full-heart">
          <span className="photo-sorted__likes">
            {likes.length}
            {likes.length > 1 ? " Likes" : " Like"}
          </span>
        </i>
      </p>
    </div>
  );
};

CommunityMostLiked.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  author: PropTypes.object,
  likes: PropTypes.array
};

export default CommunityMostLiked;
