import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { getComments } from "../../redux/actions/commentActions";
import CommentReply from "../CommentReply";

import "./style.scss";

const CommentReplies = ({
  photoId,
  comment,
  user,
  users,
  isAuthenticated,
  match,
  history,
}) => {
  const dispatch = useDispatch();
  const [isAddButtonShowing, setIsAddButtonShowing] = useState(true);
  const [setCommentText] = useState({
    text: "",
  });
 
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
      commentReply={reply}
      commentId={reply._id}
      authorId={reply.author.id}
      name={reply.author.name}
      avatar={reply.author.avatar}
      commentDate={reply.commentDate}
      commentText={reply.text}
      user={user}
      users={users}
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
        <p className="comments-replies__header">{comment.replies.length} Reply</p>
      ) : (
        <p className="comments-replies__header">{comment.replies.length} Replies</p>
      )}
      <div>{formattedCommentsReplies}</div>
    </div>
  );
};

CommentReplies.propTypes = {
  photoId: PropTypes.string,
  comment: PropTypes.object,
  user: PropTypes.object,
  users: PropTypes.array,
  isAuthenticated: PropTypes.bool,
  match: PropTypes.object,
  history: PropTypes.object
};

export default CommentReplies;
