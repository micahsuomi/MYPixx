import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getComments, deleteComment } from "../../redux/actions/commentActions";
import EditComment from "../EditComment";
import AddCommentLike from "../AddCommentLike/index";
import AddCommentReply from "../AddCommentReply";
import EditDeleteCommentModal from "../EditDeleteCommentModal";
import CommentReplies from "../CommentReplies";

import "./style.scss";
import Comments from "../PhotoComments";

const Comment = ({
  avatar,
  authorId,
  photoId,
  comment,
  name,
  user,
  isAuthenticated,
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
  const { _id, text, likes, commentDate } = comment;
  // console.log('from comment', comment)

  const deleteOnClick = () => {
    dispatch(deleteComment(photoId, _id));
    setTimeout(() => {
      dispatch(getComments(photoId));
    }, 2000);
  };

  const openEditDeleteOnClick = () => {
    setIsEditDeleteOpen(!isEditDeleteOpen);
  };

  const openEditComment = () => {
    setIsEditing(true);
    editingComment(isEditing);
    setIsCommentReplyOpen(false);
  };

  const openCommentReply = () => {
    setIsCommentReplyOpen(true);
  };

  const closeCommentReply = () => {
    setIsCommentReplyOpen(false);
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
  };

  return (
    <div className="comment-user animate-modal">
      <div className="comment-user__header">
        <div className="comment-user__image-container">
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
          <NavLink to={`/user/${authorId}`} className="comment-user__name grow">
            <p>{name}</p>
          </NavLink>
          <p className="comment-user__date">{commentDate}</p>
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
                            ? "fas fa-chevron-down grow2"
                            : "fas fa-chevron-up grow2"
                        }
                        onClick={openEditDeleteOnClick}
                        style={{
                          position: "absolute",
                          right: "3%",
                          top: "12%",
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
                <p>{text}</p>
              </>
            </div>
          ) : (
            <EditComment
              photoId={photoId}
              commentId={_id}
              editingComment={editingComment}
              closeEditComment={closeEditComment}
            />
          )}
          {!isEditing && (
            <div className="comment-user__like-reply-comment">
              <div className="comment-user__like-reply-wrapper">
                {/* consider moving here the like component */}
                {
                  comment.likes !== undefined && comment.likes.map((like) => (
                   <p>{like}</p>
                  ))
                } 

                <AddCommentLike
                  photoId={photoId}
                  comment={comment}
                  commentId={comment._id}
                  likes={comment.likes}
                  user={user}
                  history={history}
                  match={match}
                />
                {!isCommentReplyOpen ? (
                  <button
                    className="comment-user__reply-btn grow"
                    onClick={openCommentReply}
                  >
                    Reply
                  </button>
                ) : (
                  <AddCommentReply
                    photoId={photoId}
                    commentId={_id}
                    history={history}
                    match={match}
                    closeCommentReply={closeCommentReply}
                  />
                )}
              </div>
              {comment.replies.length > 0 && (
                <CommentReplies
                  photoId={photoId}
                  comment={comment}
                  user={user}
                  isAuthenticated={isAuthenticated}
                  history={history}
                  match={match}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
