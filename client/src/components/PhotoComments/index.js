import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import useComments from "../../hooks/useComments";
import { getComments } from "../../redux/actions/commentActions";
import Comment from "../Comment/index";
import AddComment from "../AddComment";

import "./style.scss";

const Comments = ({ isAuthenticated, users, user, match, history }, props) => {
  const dispatch = useDispatch();
  const [err, comments] = useComments();
  const [isCommentFieldOpened, setIsCommentFieldOpened] = useState(false);
  const [isCommentReplyOpen, setIsCommentReplyOpen] = useState(false);
  const [isAddButtonShowing, setIsAddButtonShowing] = useState(true);
  const [comment, setComment] = useState({
    text: "",
  });
  const [showOverflow, setShowOverflow] = useState(false);
  const photoId = match.params.id;

  useEffect(() => {
    dispatch(getComments(photoId));
  }, [dispatch, photoId]);

  const openCommentField = () => {
    setIsCommentFieldOpened(!isCommentFieldOpened);
  };

  const closeCommentField = () => {
    setIsCommentFieldOpened(false);
  };

  const setCommentClose = () => {
    history.push(`/photo/${photoId}/comments`);
    dispatch(getComments(photoId));
    closeCommentField();
    setComment({ text: "" });
  };

  const deleteComment = () => {
    dispatch(getComments(photoId));
  };
  const editingComment = () => {
    setIsAddButtonShowing(false);
  };

  const closeEditingComment = () => {
    setIsAddButtonShowing(true);
  };

  const updateComment = (updatedComment) => {
    setComment({ text: updatedComment });
    dispatch(getComments(photoId));
  };

  const lockScrolling = () => {
    setShowOverflow(true);
  };

  const unlockScrolling = () => {
    setShowOverflow(false);
  };

  const formattedComments = comments.map((comment) => (
    <Comment
      key={comment._id}
      photoId={match.params.id}
      comment={comment}
      authorId={comment.author.id}
      name={comment.author.name}
      avatar={comment.author.avatar}
      user={user}
      users={users}
      history={history}
      match={match}
      isAuthenticated={isAuthenticated}
      deleteComment={deleteComment}
      editingComment={editingComment}
      closeEditingComment={closeEditingComment}
      updateComment={updateComment}
      setIsAddButtonShowing={setIsAddButtonShowing}
      lockScrolling={lockScrolling}
      unlockScrolling={unlockScrolling}
    />
  ));
  return (
    <div className="comments">
      <div
        className="comments__wrapper"
        style={{ overflowY: showOverflow && "hidden" }}
      >
        <div className="comments__header">
          <NavLink to={`/photo/${match.params.id}`}>
            <i className="fas fa-chevron-left grow"></i>
          </NavLink>
        </div>
        {comments.length < 1 ? (
          <h4>No Comments Yet</h4>
        ) : (
          <div>
            {
              <h3>
                {comments.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </h3>
            }
            <div>{formattedComments}</div>
          </div>
        )}

        {user !== null && isAuthenticated ? (
          <div className="comments__body">
            {isCommentFieldOpened ? (
              <AddComment
                photoId={photoId}
                closeCommentField={closeCommentField}
                setCommentClose={setCommentClose}
                {...props}
              />
            ) : (
              <div className="comments__add-comment-wrapper">
                {!isAddButtonShowing ? (
                  ""
                ) : (
                  <button
                    className="comments__add-comment-btn"
                    onClick={openCommentField}
                  >
                    <span>Add Comment</span>
                    <i className="fas fa-comments"></i>
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="comments__buttons-wrapper">
              <h3>
                <NavLink to="/login">Login</NavLink> to leave a comment
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;

Comments.propTypes = {
  isAuthenticated: PropTypes.bool,
  users: PropTypes.array,
  user: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};
