import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  getComments,
  getComment,
  editComment,
} from "../../redux/actions/commentActions";

import "./style.scss";

const EditComment = ({ photoId, commentId, closeEditComment }, props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    text: "",
  });
  const foundComment = useSelector((state) => state.comment.comment);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
    dispatch(getComment(photoId, commentId));
  }, [dispatch]);

  useEffect(() => {
    setComment(foundComment);
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
      dispatch(getComments(photoId));
    }, 2000);
  };

  const { text } = comment;
  return (
    <form className="edit-comment animate-modal" onSubmit={handleSubmit}>
      <textarea
        type="text"
        value={text}
        name="text"
        placeholder="write comment here"
        onChange={handleChange}
      ></textarea>
      <div className="edit-comment__edit-delete">
        <button className="edit-comment__comment-btn">Save</button>
        <button
          className="edit-comment__comment-btn"
          onClick={closeEditComment}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditComment;
