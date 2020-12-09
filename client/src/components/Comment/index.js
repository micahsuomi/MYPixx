import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  getComments,
  getComment,
  deleteComment,
} from "../../redux/actions/commentActions";
import EditComment from "../EditComment";
import LikeComment from "../LikeComment/index";

import "./style.scss";

const Comment = ({
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
  match
}) => {
 
  const dispatch = useDispatch();
  /*
  const foundComment = useSelector((state) => state.comments.comment);
  
  const [comment, setComment] = useState({
    text: "",
  });*/
  const [isEditing, setIsEditing] = useState(false);

  const deleteOnClick = () => {
    dispatch(deleteComment(photoId, commentId));
    setTimeout(() => {
      dispatch(getComments(photoId));
    }, 2000);
  };

  useEffect(() => {
    dispatch(getComment(match.params.id, commentId));
  }, [dispatch]);

  /*
  useEffect(() => {
    getComment(photoId, commentId)
 }, [foundComment]);

  useEffect(() => {
      setComment(foundComment)
  }, [foundComment]);*/

  const openEditComment = () => {
    setIsEditing(true);
    editingComment(isEditing);
  };

  const closeEditComment = () => {
    setIsEditing(false);
    setTimeout(() => {
      dispatch(getComments(photoId));
    }, 1000);
    closeEditingComment(isEditing);
  };

  // console.log('this is the author id',  user, isAuthenticated, authorId, user.id)

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
            <div>
              <p className="comment-user__text">{commentText}</p>
              <div>
                {user && isAuthenticated && authorId === user.user.id && (
                  <i
                    className="fas fa-pen comment-user__edit-btn grow"
                    onClick={openEditComment}
                  ></i>
                )}
                {user && isAuthenticated && authorId === user.user.id && (
                  <i
                    className="fas fa-trash comment-user__delete-btn grow"
                    onClick={deleteOnClick}
                  ></i>
                )}
              </div>
            </div>
          ) : (
            <EditComment
              photoId={photoId}
              commentId={commentId}
              editingComment={editingComment}
              closeEditComment={closeEditComment}
            />
          )}
        </div>
        {!isEditing ? (
          <div className="likephoto-comments__container">
            <div>
              <LikeComment
                photoId={photoId}
                commentId={commentId}
                likes={likes}
                user={user}
                history={history}
                match={match}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};



export default Comment;
