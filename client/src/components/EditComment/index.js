import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getComment,
  editComment,
} from "../../redux/actions/commentActions";

const EditComment = ({ photoId, commentId, closeEditComment }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    text: "",
  });
  const foundComment = useSelector((state) => state.comments.comment);

  useEffect(() => {
    dispatch(getComment(photoId, commentId));
    console.log("fetch comment", foundComment);
  }, [dispatch]);

  useEffect(() => {
    setComment(foundComment);
    console.log("comment is here", comment);
  }, [foundComment]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedComment = comment;
    console.log(updatedComment);
    dispatch(editComment(photoId, commentId, updatedComment));
    setTimeout(() => {
      closeEditComment();
    }, 2000);
  };

  const { text } = comment;
  return (
    <form className="edit-comment__form animate-modal" onSubmit={handleSubmit}>
      <textarea
        type="text"
        value={text}
        name="text"
        placeholder="write comment here"
        onChange={handleChange}
      ></textarea>
      <div className="submit-cancel__btn__wrapper">
        <button className="edit-delete__comment-btn">
          <i className="fas fa-check-circle fa-2x edit-comment__btn"></i>
        </button>
        <button className="edit-delete__comment-btn" onClick={closeEditComment}>
          <i className="fas fa-times-circle fa-2x delete-comment__btn"></i>
        </button>
      </div>
    </form>
  );
};

export default EditComment;
