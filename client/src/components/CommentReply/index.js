import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  getComments,
  getComment,
  likeComment,
  deleteComment,
} from "../../redux/actions/commentActions";
import EditComment from "../EditComment";
import EditDeleteCommentModal from "../EditDeleteCommentModal";
import AddCommentLikeForm from "../AddCommentLikeForm";
import CommentLike from "../CommentLike";

import "./style.scss";

const CommentReply = ({
  avatar,
  authorId,
  commentReply,
  photoId,
  commentId,
  name,
  commentText,
  user,
  users,
  isAuthenticated,
  commentDate,
  editingComment,
  closeEditingComment,
  history,
}) => {
  const dispatch = useDispatch();
  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommentReplyOpen, setIsCommentReplyOpen] = useState(false);
  const [isArrowShowing, setIsArrowShowing] = useState(false);
  const [isLikesShowing, setIsLikeShowing] = useState(false);

  // console.log('from comment replies', user, isAuthenticated)
  const openEditDeleteOnClick = () => {
    setIsEditDeleteOpen(!isEditDeleteOpen);
  };

  const closeEditDelete = () => {
    setIsEditDeleteOpen(!isEditDeleteOpen);
  }

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
    setIsEditDeleteOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      if (isAuthenticated && user) {
        dispatch(likeComment(photoId, commentReply._id, commentReply));
        setTimeout(() => {
          dispatch(getComments(photoId));
          dispatch(getComment(photoId, commentReply._id));
        }, 500);
      }
    }
  };

  const showCommentLikes = () => {
    setIsLikeShowing(true);
  };

  const hideCommentLikes = () => {
    setIsLikeShowing(false);
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
          <NavLink
            to={`/user/${authorId}`}
            className="comment-reply-user__name grow"
          >
            <p>{name}</p>
          </NavLink>
          <p className="comment-reply-user__date">{commentDate}</p>
          {!isEditing ? (
            <div
              className="comment-user__text"
              onMouseEnter={showEditingArrow}
              onMouseLeave={hideEditingArrow}
            >
              <>
                {isArrowShowing &&
                  user &&
                  isAuthenticated &&
                  authorId === user.user._id && (
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
                          top: "6%",
                          cursor: "pointer",
                          color: "rgb(139, 119, 119)",
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
          {isLikesShowing && (
            <div className="comment-user__likes-list-container animate-modal">
              <div className="comment-user__likes-header">
                <i
                  className="fas fa-chevron-left fa comment-user__close-likes-comment grow"
                  onClick={hideCommentLikes}
                ></i>
              </div>
              {commentReply.likes !== undefined &&
                users.map((user) => {
                  for (let i = 0; i < commentReply.likes.length; i++) {
                    const like = commentReply.likes[i];
                    if (user._id === like) {
                      return (
                        <CommentLike
                          key={like}
                          userId={user._id}
                          avatar={user.avatar}
                          name={user.name}
                          showCommentLikes={showCommentLikes}
                          hideCommentLikes={hideCommentLikes}
                        />
                      );
                    }
                  }
                })}
            </div>
          )}
          {!isEditing && (
            <div className="comment-reply-user__like-reply-comment">
              <AddCommentLikeForm
                handleSubmit={handleSubmit}
                commentLikes={
                  commentReply.likes !== undefined && commentReply.likes
                }
                showCommentLikes={showCommentLikes}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CommentReply.propTypes = {
  avatar: PropTypes.string,
  authorId: PropTypes.string,
  commentReply: PropTypes.object,
  photoId: PropTypes.string,
  commentId: PropTypes.string,
  name: PropTypes.string,
  commentText: PropTypes.string,
  user: PropTypes.object,
  users: PropTypes.array,
  isAuthenticated: PropTypes.bool,
  commentDate: PropTypes.string,
  editingComment: PropTypes.func,
  closeEditingComment: PropTypes.func,
  history: PropTypes.object
};

export default CommentReply;
