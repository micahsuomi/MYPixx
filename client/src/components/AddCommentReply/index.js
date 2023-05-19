import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Picker from "@emoji-mart/react";
// import "emoji-mart/css/emoji-mart.css";

import {
  getComments,
  addCommentReply,
} from "../../redux/actions/commentActions";

import "./style.scss";

const AddCommentReply = ({ photoId, commentId, closeCommentReply }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    text: "",
  });
  const [openEmoji, setOpenEmoji] = useState(false);

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
  };

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

  const { text } = comment;

  return (
    <form
      className="add-commentreply-form animate-modal"
      onSubmit={handleSubmit}
    >
      <div className="input-topics">
        <textarea
          type="text"
          name="text"
          value={text}
          placeholder="reply to comment..."
          onChange={handleChange}
        />
        {openEmoji ? (
          <>
            <span
              className="add-commentreply-form__emoji-menu animate-pop hide-tablet-mobile"
              onMouseLeave={closeMenu}
            >
              <Picker onEmojiSelect={addEmoji} emojiTooltip={true} />
            </span>
          </>
        ) : (
          <button
            onClick={openEmojis}
            title="open emojis"
            className="add-commentreply-form__emoji-btn grow hide-tablet-mobile"
          >
            <i className="far fa-smile"></i>
          </button>
        )}
        <div className="add-commentreply-form__save-wrapper">
          <button className="add-commentreply-form__btn-submit">
            <i className="fas fa-paper-plane"></i>
          </button>
          <button
            className="add-commentreply-form__btn-cancel"
            onClick={closeCommentReply}
          >
            <i className="far fa-times-circle"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCommentReply;

AddCommentReply.propTypes = {
  photoId: PropTypes.string,
  commentId: PropTypes.string,
  closeCommentReply: PropTypes.func,
};
