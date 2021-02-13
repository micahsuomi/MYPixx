import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import useComments from "../../hooks/useComments";
import { getComments } from "../../redux/actions/commentActions";
import Comment from "../Comment/index";
import AddComment from "../AddComment";

import "./style.scss";

const Comments = (props) => {
  const dispatch = useDispatch();
  const [err, comments] = useComments();
  const [isCommentFieldOpened, setIsCommentFieldOpened] = useState(false);
  const [isCommentReplyOpen, setIsCommentReplyOpen] = useState(false);
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
    props.history.push(`/photos/${photoId}/comments`);
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

  const { isAuthenticated } = props;
  const formattedComments = comments.map((comment) => (
    <Comment
      key={comment._id}
      photoId={props.match.params.id}
      comment={comment}
      authorId={comment.author.id}
      name={comment.author.name}
      avatar={comment.author.avatar}
      user={props.user}
      users={props.users}
      history={props.history}
      match={props.match}
      isAuthenticated={props.isAuthenticated}
      deleteComment={deleteComment}
      editingComment={editingComment}
      closeEditingComment={closeEditingComment}
      updateComment={updateComment}
      setIsAddButtonShowing={setIsAddButtonShowing}
    />
  ));
  return (
    <div className="comments">
      <div className="comments__wrapper">
        <div className="comments__header">
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
              <div className="comments__add-comment-wrapper">
                {!isAddButtonShowing ? (
                  ""
                ) : (
                  <button
                    className="comments__add-comment-btn"
                    onClick={openCommentField}
                  >
                    <span>Add Comment</span>
                    <i class="fas fa-comments"></i>
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
