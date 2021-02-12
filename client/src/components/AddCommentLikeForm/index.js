import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

const AddCommentLikeForm = ({ 
    photoId,
    commentId,
    commentLiked,
    handleSubmit ,
    commentLikes,
    showCommentLikes
}) => {
  return (
    <div className="like-comment__form__container">
      <form className="like-container" onSubmit={handleSubmit}>
        <button className="like-comment__btn grow">
          {commentLiked ? (
            <i className="fas fa-heart full-heart"></i>
          ) : (
            <i className="far fa-heart empty-heart"></i>
          )}
        </button>
        {commentLikes !== undefined && commentLikes.length > 0 ? (
          <p
            className="likes-number grow"
            onClick={showCommentLikes}
          >
            {commentLikes.length}
            {commentLikes.length === 1 ? (
              <span className="like-comments-num"> Like</span>
            ) : (
              <span> Likes</span>
            )}
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default AddCommentLikeForm;
