import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getComments,
  getComment,
  deleteComment,
} from "../../redux/actions/commentActions";
import EditComment from "../EditComment";
import LikeComment from "../LikeComment/index";

import "./style.css";
import { useEffect } from "react";

const Comment = (props) => {
  // console.log(props)
  const { photoId, commentId, likes, history, match } = props;

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
    props.editingComment(isEditing);
  };

  const closeEditComment = () => {
    setIsEditing(false);
    setTimeout(() => {
      dispatch(getComments(photoId));
    }, 1000);
    props.closeEditingComment(isEditing);
  };

  let {
    avatar,
    authorId,
    name,
    date,
    commentText,
    user,
    isAuthenticated,
  } = props;
  // console.log('this is the author id',  user, isAuthenticated, authorId, user.id)

  return (
    <div className="comment-user__container animate-modal">
      <div className="comment-user__header">
        <div className="comment-image-container">
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
          <p className="comment-date">{date}</p>
          {!isEditing ? (
            <div>
              <p className="comment-text">{commentText}</p>
              <div>
                {user && isAuthenticated && authorId === user.user.id ? (
                  <i
                    className="fas fa-trash delete-comment__btn grow"
                    onClick={deleteOnClick}
                  ></i>
                ) : null}
                {user && isAuthenticated && authorId === user.user.id ? (
                  <i
                    className="fas fa-edit edit-comment__btn grow"
                    onClick={openEditComment}
                  ></i>
                ) : null}
              </div>
            </div>
          ) : (
            <EditComment
              photoId={photoId}
              commentId={commentId}
              editingComment={props.editingComment}
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
                user={props.user}
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
