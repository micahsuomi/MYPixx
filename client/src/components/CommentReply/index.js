import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  getComments,
  deleteComment,
} from "../../redux/actions/commentActions";
import EditComment from "../EditComment";
import EditDeleteCommentModal from "../EditDeleteCommentModal";

import "./style.scss";

const CommentReply = ({
  avatar,
  authorId,
  photoId,
  commentId,
  name,
  commentText,
  user,
  isAuthenticated,
  likes,
  commentDate,
  editingComment,
  closeEditingComment,
  history,
  match,
}) => {
  const dispatch = useDispatch();
  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommentReplyOpen, setIsCommentReplyOpen] = useState(false);
  const [isArrowShowing, setIsArrowShowing] = useState(false);

  // console.log('from comment replies', user, isAuthenticated)
  const openEditDeleteOnClick = () => {
        setIsEditDeleteOpen(!isEditDeleteOpen);
    };
    
  const deleteOnClick = () => {
    dispatch(deleteComment(photoId, commentId));
    setTimeout(() => {
      dispatch(getComments(photoId));
    }, 2000);
  };

  const openEditComment = () => {
    setIsEditing(true);
    setIsEditDeleteOpen(false);
    editingComment(isEditing);
  };

  const openCommentReply = () => {
    setIsCommentReplyOpen(true);
  };

  const closeCommentReply = () => {
    setIsCommentReplyOpen(false);
  }

  const closeEditComment = () => {
    setIsEditing(false);
    setTimeout(() => {
      dispatch(getComments(photoId));
    }, 1000);
    closeEditingComment(isEditing);
  };

  const showEditingArrow = () => {
    setIsArrowShowing(true);
  };

  const hideEditingArrow = () => {
    setIsArrowShowing(false);
  };

  // console.log('this is the author id',  user, isAuthenticated, authorId, user.id)

  return (
    <div className="comment-reply-user animate-modal">
      <div className="comment-reply-user__header">
        <div className="comment-reply-user__image-container">
          {avatar === undefined || avatar === "" ? (
            <img
              src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
              alt={avatar}
            />
          ) : (
            <img src={avatar} alt={avatar} />
          )}
        </div>
        <div>
          <NavLink to={`/user/${authorId}`} className="comment-reply-user__name grow">
            <p>{name}</p>
          </NavLink>
          <p className="comment-reply-user__date">{commentDate}</p>
          {!isEditing ? (
            <div className="comment-user__text"
              onMouseEnter={showEditingArrow}
              onMouseLeave={hideEditingArrow}
              >
              <>
                {isArrowShowing && user && isAuthenticated && authorId === user.user._id && (
                  <>
                    <i
                      className={
                        !isEditDeleteOpen
                          ? "fas fa-chevron-down"
                          : "fas fa-chevron-up"
                      }
                      onClick={openEditDeleteOnClick}
                      style={{
                        position: "absolute",
                        right: "3%",
                        top: "12%",
                        cursor: "pointer",
                        color: "rgb(139, 119, 119)"
                      }}
                    ></i>
                    {isEditDeleteOpen && (
                      <EditDeleteCommentModal
                       openEditComment={openEditComment}
                       deleteOnClick={deleteOnClick}
                    />
                    )}
                  </>
                )}
                <p>{commentText}</p>
              </>
            </div>
          ) : (
            <EditComment
              photoId={photoId}
              commentId={commentId}
              editingComment={editingComment}
              closeEditComment={closeEditComment}
            />
          )}
          {!isEditing && (
            <div className="comment-reply-user__like-reply-comment">
           {/* comment like form goes here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
