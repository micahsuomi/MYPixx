import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getComment,
  getComments,
  getCommentLikes,
  likeComment,
} from "../../redux/actions/commentActions";
import CommentLike from "../CommentLike/index";

import "../LikePhoto/style.scss";
import "./style.scss";

const LikeComment = ({ photoId, commentId, likes, history, match }, props) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const likedComment = useSelector((state) => state.comments.comment);
  const commentLikes = useSelector((state) => state.comments.commentLikes);

  // const isCommentLiked = useSelector((state) => state.comments.isCommentLiked);
  const [isLikesShowing, setIsLikeShowing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated && !user) {
      history.push("/login");
    } else {
      if (isAuthenticated && user) {
        dispatch(getComment(match.params.id, commentId));
        dispatch(likeComment(photoId, commentId, likedComment));

        setTimeout(() => {
          dispatch(getComments(photoId));
          dispatch(getCommentLikes(photoId, commentId));
        }, 1500);
      }
    }
  };

  // console.log('likes', likes.lenght)

  useEffect(() => {
    dispatch(getCommentLikes(photoId, commentId));
  }, [dispatch]);

  const showCommentLikes = () => {
    setIsLikeShowing(true);
  };
  const closeCommentLikes = () => {
    setIsLikeShowing(false);
  };

  // console.log('like here', likes)
  const formattedLikes = commentLikes.map((like) => (
    <CommentLike
      key={like._id}
      userId={like._id}
      avatar={like.avatar}
      name={like.name}
    />
  ));

  // console.log('this should update', likedComment)

  /*
  let likedPhotoComment;
  useEffect(() => {
    if (isAuthenticated) {
      likedPhotoComment = likedComment.likes.some(
        (like) => like._id === user._id
      );
    }
  }, [likedPhotoComment]);
  console.log(likedPhotoComment);*/

  if (!likedComment) {
    return <p>loading...</p>;
  }
  return (
    <div className="like-comment__form__container">
      <form className="like-container" onSubmit={handleSubmit}>
        {isAuthenticated &&
        commentLikes.some((like) => like._id === user._id) ? (
          <button className="like-comment__btn grow">
            <i className="fas fa-heart full-heart"></i> Unlike
          </button>
        ) : (
          <button className="like-comment__btn grow">
            <i className="far fa-heart empty-heart"></i> Like
          </button>
        )}
        {likes.length > 0 ? (
          <NavLink
            to={`/photos/${photoId}/comments/${commentId}/likes`}
            className="likes-number grow"
            onClick={showCommentLikes}
          >
            {likes.length}
            {likes.length === 1 ? (
              <span className="like-comments-num"> Like</span>
            ) : (
              <span> Likes</span>
            )}
          </NavLink>
        ) : null}
      </form>
      {isLikesShowing ? (
        <div className="likes-comments-box">
          <div className="likes-comments-box__header">
            <NavLink
              to={`/photos/${photoId}/comments/`}
              onClick={closeCommentLikes}
            >
              <i className="fas fa-times-circle grow"></i>
            </NavLink>
          </div>
          <div className="likes-comments-box__body">{formattedLikes}</div>
        </div>
      ) : null}
    </div>
  );
};

export default LikeComment;
