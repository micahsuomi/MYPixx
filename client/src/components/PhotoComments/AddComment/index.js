import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment, getComments } from "../../../redux/actions/commentActions";

import "./style.scss";

const AddComment = ({ photoId, closeCommentField, setCommentClose }, props) => {
  console.log(props);
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
    }, 2000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setComment({ [name]: value });
    console.log(name, value);
  };

  const { text } = comment;

  return (
    <form className="add-comment-form animate-modal" onSubmit={handleSubmit}>
      <div className="input-topics">
        <label htmlFor="comment">Comment</label>
        <textarea
          type="text"
          name="text"
          value={text}
          placeholder="write a new comment here"
          onChange={handleChange}
        />
        <div className="btn-save__wrapper">
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

export default AddComment;
