import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "../../../redux/actions/commentActions";

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
    setCommentClose();
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setComment({ [name]: value });
    console.log(name, value);
  };

  const { text } = comment;

  return (
    <form className="add-comment__form animate-modal" onSubmit={handleSubmit}>
      <div className="input-topics">
        <label htmlFor="description">Comment</label>
        <textarea
          type="text"
          name="text"
          value={text}
          placeholder="write a new comment here"
          onChange={handleChange}
        />
        <div className="btn-save__wrapper">
          <button className="btn-save">Submit</button>
          <button className="btn-save" onClick={closeCommentField}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
