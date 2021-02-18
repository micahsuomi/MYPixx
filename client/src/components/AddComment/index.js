import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import { addComment, getComments } from "../../redux/actions/commentActions";


import "./style.scss";

const AddComment = ({ photoId, closeCommentField, setCommentClose }, props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    text: "",
  });
  const [openEmoji, setOpenEmoji] = useState(false);

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

  const addEmoji = (e) => {
    let emoji = e.native;
    setComment({
      text: text + emoji,
    });
  };

  const openEmojis = () => {
    setOpenEmoji(true);
  };

  const closeMenu = () => {
    setOpenEmoji(false);
  };

  return (
    <form className="add-comment-form animate-modal" onSubmit={handleSubmit}>
      <div className="input-topics">
        <textarea
          type="text"
          name="text"
          value={text}
          placeholder="write a comment..."
          onChange={handleChange}
        />

        {openEmoji ? (
          <>
            <span
              className="add-comment-form__emoji-menu animate-pop hide-tablet-mobile"
              onMouseLeave={closeMenu}
            >
              <Picker onSelect={addEmoji} emojiTooltip={true} />
            </span>
          </>
        ) : (
          <button
            onClick={openEmojis}
            title="open emojis"
            className="add-comment-form__emoji-btn grow hide-tablet-mobile"
          >
            <i className="far fa-smile"></i>
          </button>
        )}

        <div className="add-comment-form__btn-wrapper">
          <button className="add-comment-form__btn-submit grow">
            <i class="fas fa-paper-plane"></i></button>
          <button
            className="add-comment-form__btn-cancel grow"
            onClick={closeCommentField}
          >
            <i class="far fa-times-circle"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;

AddComment.propTypes = {
  photoId: PropTypes.string,
  closeCommentField: PropTypes.func,
  setCommentClose: PropTypes.func,
};

const styles = {
  container: {
    padding: 20,
    borderTop: "1px #4C758F solid",
    marginBottom: 20,
  },
  form: {
    display: "flex",
  },
  input: {
    color: "inherit",
    background: "none",
    outline: "none",
    border: "none",
    flex: 1,
    fontSize: 16,
  },
  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: 0,
    cursor: "pointer",
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px",
  },
};
