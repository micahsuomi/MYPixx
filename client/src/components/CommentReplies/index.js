import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getComments } from "../../redux/actions/commentActions";
import { getPhotoLikes } from "../../redux/actions/photoActions";

import CommentReply from "../CommentReply";

import "./style.scss";

const CommentReplies = ({
  photoId,
  comment,
  user,
  isAuthenticated,
  match,
  history,
}) => {
  const dispatch = useDispatch();
  const [isCommentFieldOpened, setIsCommentFieldOpened] = useState(false);
  const [isAddButtonShowing, setIsAddButtonShowing] = useState(true);
  const [likes, setLikes] = useState([]);
  const [commentText, setCommentText] = useState({
    text: "",
  });
  /*
  console.log(
    "props from comment replies",
    photoId,
    comment,
    user,
    isAuthenticated,
    match,
    history
  );*/
  //   console.log('comments are here', props)

  //   const id = props.match.params.id;

  /*
  useEffect(() => {
    dispatch(getPhotoLikes(props.photoId));
  }, [dispatch]);

  console.log(likes)
  useEffect(() => {
    setLikes(photoLikes);
  }, [photoLikes]);
  */

  const openCommentField = () => {
    setIsCommentFieldOpened(!isCommentFieldOpened);
  };

  const closeCommentField = () => {
    setIsCommentFieldOpened(false);
  };

  const setCommentClose = () => {
    history.push(`/photos/${photoId}/comments`);
    dispatch(getComments(photoId));
    closeCommentField();
    setCommentText({ text: "" });
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
    setCommentText({ text: updatedComment });
    dispatch(getComments(photoId));
  };

  const formattedCommentsReplies = comment.replies.map((reply) => (
    <CommentReply
      key={reply._id}
      commentId={reply._id}
      authorId={reply.author.id}
      name={reply.author.name}
      avatar={reply.author.avatar}
      commentDate={reply.commentDate}
      commentText={reply.text}
      user={user}
      photoId={photoId}
      history={history}
      match={match}
      isAuthenticated={isAuthenticated}
      deleteComment={deleteComment}
      editingComment={editingComment}
      closeEditingComment={closeEditingComment}
      updateComment={updateComment}
    />
  ));

  return (
    <div className="comments-replies">
      {comment.replies.length === 1 ? (
        <p>{comment.replies.length} Reply</p>
      ) : (
        <p>{comment.replies.length} Replies</p>
      )}
      <div>{formattedCommentsReplies}</div>
    </div>
  );
};

export default CommentReplies;
