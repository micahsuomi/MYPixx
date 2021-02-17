import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addComment, getComments } from "../../redux/actions/commentActions";

import "./style.scss";

const AddComment = ({ photoId, closeCommentField, setCommentClose }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let { text } = comment;
    const newComment = { text };
    dispatch(addComment(photoId, newComment));
    setTimeout(() => {
      dispatch(getComments(photoId));
      setCommentClose();
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ [name]: value });
  };

  const { text } = comment;

  return (
    <form className="add-comment-form animate-modal" onSubmit={handleSubmit}>
      <div className="input-topics">
        {/* <label htmlFor="comment">Comment</label> */}
        <textarea
          type="text"
          name="text"
          value={text}
          placeholder="write a comment..."
          onChange={handleChange}
        />
        <div className="add-comment-form__btn-wrapper">
          <button className="add-comment-form__btn-submit">Submit</button>
          <button
            className="add-comment-form__btn-cancel"
            onClick={closeCommentField}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

AddComment.propTypes = {
  photoId: PropTypes.string,
  closeCommentField: PropTypes.func,
  setCommentClose: PropTypes.func
};

export default AddComment;
