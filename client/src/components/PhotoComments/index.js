import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import useComments from "../../hooks/useComments";
import { getComments, addComment } from "../../redux/actions/commentActions";
import Comment from "../Comment/index";
import AddComment from "./AddComment";

import "./style.css";

const Comments = (props) => {
  const dispatch = useDispatch();
  const [err, comments] = useComments();
  const [isCommentFieldOpened, setIsCommentFieldOpened] = useState(false);
  const [isAddButtonShowing, setIsAddButtonShowing] = useState(true);
  const [comment, setComment] = useState({
    text: "",
  });

  const photoId = props.match.params.id;

  useEffect(() => {
    dispatch(getComments(photoId));
  }, [dispatch]);

  const openCommentField = () => {
    setIsCommentFieldOpened(!isCommentFieldOpened);
  };

  const closeCommentField = () => {
    setIsCommentFieldOpened(false);
  };

  const setCommentClose = () => {
    console.log("I am calling from here");
    props.history.push(`/photos/${photoId}/comments`);
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

  const updateLikesComment = () => {
    dispatch(getComments(photoId));
  };

  const { isAuthenticated } = props;
  const formattedComments = comments.map((comment) => (
    <Comment
      key={comment._id}
      commentId={comment._id}
      authorId={comment.author.id}
      name={comment.author.name}
      avatar={comment.author.avatar}
      date={comment.createdAt}
      likes={comment.likes}
      commentText={comment.text}
      user={props.user}
      photoId={props.match.params.id}
      history={props.history}
      isAuthenticated={props.isAuthenticated}
      tokenConfig={props.tokenConfig}
      deleteComment={deleteComment}
      editingComment={editingComment}
      closeEditingComment={closeEditingComment}
      updateComment={updateComment}
      updateLikesComment={updateLikesComment}
    />
  ));
  return (
    <div className="comments-container">
      <div className="comments-wrapper">
        <div className="comments-header">
          <NavLink to={`/photos/${props.match.params.id}`}>
            <i className="fas fa-chevron-left fa-2x grow"></i>
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

        {props.user !== null && isAuthenticated ? (
          <div>
            {isCommentFieldOpened ? (
              <AddComment
                photoId={photoId}
                closeCommentField={closeCommentField}
                setCommentClose={setCommentClose}
                {...props}
              />
            ) : (
              <div className="add-comment__btn__wrapper">
                {!isAddButtonShowing ? (
                  ""
                ) : (
                  <button
                    className="add-comment__btn"
                    onClick={openCommentField}
                  >
                    Add Comment
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="buttons-wrapper">
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
