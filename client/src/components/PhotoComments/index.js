import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import PropTypes from "prop-types";
=======
>>>>>>> develop

import useComments from "../../hooks/useComments";
import { getComments } from "../../redux/actions/commentActions";
import Comment from "../Comment/index";
<<<<<<< HEAD
import AddComment from "../AddComment";

import "./style.scss";

const Comments = ({ isAuthenticated, users, user, match, history }, props) => {
  const dispatch = useDispatch();
  const [err, comments] = useComments();
  const [isCommentFieldOpened, setIsCommentFieldOpened] = useState(false);
  const [isCommentReplyOpen, setIsCommentReplyOpen] = useState(false);
=======
import AddComment from "./AddComment";

import "./style.scss";

const Comments = (props) => {
  const dispatch = useDispatch();
  const [err, comments] = useComments();
  const [isCommentFieldOpened, setIsCommentFieldOpened] = useState(false);
>>>>>>> develop
  const [isAddButtonShowing, setIsAddButtonShowing] = useState(true);
  const [comment, setComment] = useState({
    text: "",
  });
<<<<<<< HEAD
  const [showOverflow, setShowOverflow] = useState(false);
  const photoId = match.params.id;

  useEffect(() => {
    dispatch(getComments(photoId));
  }, [dispatch, photoId]);
=======

  const photoId = props.match.params.id;

  useEffect(() => {
    dispatch(getComments(photoId));
  }, [dispatch]);
>>>>>>> develop

  const openCommentField = () => {
    setIsCommentFieldOpened(!isCommentFieldOpened);
  };

  const closeCommentField = () => {
    setIsCommentFieldOpened(false);
  };

  const setCommentClose = () => {
<<<<<<< HEAD
    history.push(`/photo/${photoId}/comments`);
=======
    props.history.push(`/photos/${photoId}/comments`);
>>>>>>> develop
    dispatch(getComments(photoId));
    closeCommentField();
    setComment({ text: "" });
  };

  const deleteComment = () => {
    dispatch(getComments(photoId));
  };
<<<<<<< HEAD

=======
>>>>>>> develop
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

<<<<<<< HEAD
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
=======
  const { isAuthenticated } = props;
  const formattedComments = comments.map((comment) => (
    <Comment
      key={comment._id}
      commentId={comment._id}
      authorId={comment.author.id}
      name={comment.author.name}
      avatar={comment.author.avatar}
      commentDate={comment.commentDate}
      likes={comment.likes}
      commentText={comment.text}
      user={props.user}
      photoId={props.match.params.id}
      history={props.history}
      match={props.match}
      isAuthenticated={props.isAuthenticated}
>>>>>>> develop
      deleteComment={deleteComment}
      editingComment={editingComment}
      closeEditingComment={closeEditingComment}
      updateComment={updateComment}
<<<<<<< HEAD
      setIsAddButtonShowing={setIsAddButtonShowing}
      lockScrolling={lockScrolling}
      unlockScrolling={unlockScrolling}
=======
>>>>>>> develop
    />
  ));
  return (
    <div className="comments">
<<<<<<< HEAD
      <div
        className="comments__wrapper"
        style={{ overflowY: showOverflow && "hidden" }}
      >
        <div className="comments__header">
          <NavLink to={`/photo/${match.params.id}`}>
            <i className="fas fa-chevron-left grow"></i>
=======
      <div className="comments__wrapper">
        <div className="comments__header">
          <NavLink to={`/photos/${props.match.params.id}`}>
            <i className="fas fa-chevron-left fa-2x grow"></i>
>>>>>>> develop
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

<<<<<<< HEAD
        {user !== null && isAuthenticated ? (
          <div className="comments__body">
=======
        {props.user !== null && isAuthenticated ? (
          <div>
>>>>>>> develop
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
<<<<<<< HEAD
                    <span>Add Comment</span>
                    <i className="fas fa-comments"></i>
=======
                    Add Comment
>>>>>>> develop
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
<<<<<<< HEAD

Comments.propTypes = {
  isAuthenticated: PropTypes.bool,
  users: PropTypes.array,
  user: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};
=======
>>>>>>> develop
