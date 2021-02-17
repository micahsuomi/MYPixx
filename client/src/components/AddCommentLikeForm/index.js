import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import "./style.scss";

const AddCommentLikeForm = ({ 
    handleSubmit,
    commentLikes,
    showCommentLikes,
}) => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="like-comment">
      <form className="like-comment__form" onSubmit={handleSubmit}>
        <button className="like-comment__btn grow">
          {commentLikes !== undefined && commentLikes.some((like) => like === user._id)  ? ( 
            <i className="fas fa-heart full-heart"></i>
          ) : (
            <i className="far fa-heart empty-heart"></i>
          )}
        </button>
        {commentLikes !== undefined && commentLikes.length > 0 ? (
          <p
            className="like-comment__nums grow"
            onClick={showCommentLikes}
          >
            {commentLikes.length}
            {commentLikes.length === 1 ? (
              <span className="like-comment__nums-like"> Like</span>
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

AddCommentLikeForm.propTypes = {
  handleSubmit: PropTypes.func,
  commentLikes: PropTypes.array,
  showCommentLikes: PropTypes.func
};
