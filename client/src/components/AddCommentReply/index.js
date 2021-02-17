import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { getComments, addCommentReply } from "../../redux/actions/commentActions";

import "./style.scss";

const AddCommentReply = ({ 
    photoId, 
    commentId, 
    closeCommentReply 
}) => {

  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let { text } = comment;
    const commentReply = { text };
    dispatch(addCommentReply(photoId, commentId, commentReply));
    setTimeout(() => {
      dispatch(getComments(photoId));
      closeCommentReply();
    }, 2000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setComment({ [name]: value });
    console.log(name, value);
  };

  const { text } = comment;

  return (
    <form className="add-commentreply-form animate-modal" onSubmit={handleSubmit}>
      <div className="input-topics">
        <textarea
          type="text"
          name="text"
          value={text}
          placeholder="reply to comment..."
          onChange={handleChange}
        />
        <div className="add-commentreply__save-wrapper">
          <button className="add-commentreply-form__btn-submit">Submit</button>
          <button
            className="add-commentreply-form__btn-cancel"
            onClick={closeCommentReply}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

AddCommentReply.propTypes = {
  photoId: PropTypes.string,
  commentId: PropTypes.string,
  closeCommentReply: PropTypes.func,
};

export default AddCommentReply;
