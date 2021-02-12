import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getComment,
  getComments,
  likeComment,
} from "../../redux/actions/commentActions";
import {
  getPhotos
} from "../../redux/actions/photoActions";
import CommentLike from "../CommentLike/index";

import "../LikePhoto/style.scss";
import "./style.scss";

const AddCommentLike = (
  { 
  photoId, comment, commentId, likes, history, match 
}
) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const testComment = useSelector((state) => state.comment.comment);
  const [commentLikes, setCommentLikes] = useState()
  const user = useSelector((state) => state.user.user);
  const [isLikesShowing, setIsLikeShowing] = useState(false);
  const [commentLiked, setCommentLiked] = useState();
  console.log('from add comment like', comment);

  //this component needs to be fixed
  // console.log('from add comment like',   photoId, comment, commentId, likes, history, match);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      if (isAuthenticated && user) {
        // console.log("photo id", photoId, 
        //   'comment id', commentId, comment);
        // dispatch(getComment(match.params.id, commentId));
        dispatch(likeComment(photoId, commentId, comment));
        setTimeout(() => {
          if(testComment._id === comment._id) {
            setCommentLikes(testComment)
            console.log(commentLikes)
          }
          // console.log('back from state', testComment)
          // dispatch(getComments(photoId));
          dispatch(getComment(photoId, commentId));
        }, 1000);
      }
    }
  };

  const showCommentLikes = () => {
    setIsLikeShowing(true);
  };

  const closeCommentLikes = () => {
    setIsLikeShowing(false);
  };

  
  let formattedLikes
  if(comment !== undefined)
  formattedLikes = comment.likes.map((like) => (
    console.log(like)
    /*<CommentLike
      key={like._id}
      userId={like._id}
      avatar={like.avatar}
      name={like.name}
    />*/
  ));
  console.log(formattedLikes)
  // console.log("this should update", likedComment);

  const checkedLikedComment = async () => {
    try {
      const likedPhotoComment = await comment.likes.some(
        (like) => like._id === user._id
      );
      // console.log("liked comment", likedPhotoComment);
      setCommentLiked(likedPhotoComment);
    } catch (err) {

    }
  };

  const loadCommentLikes = () => {

  }
  useEffect(() => {
    if (comment !== undefined) {
      // setCommentLikes(comment)
    }
  }, []);

  if (!commentLikes) {
     return ' '
  }

  return (
    <div className="like-comment__form__container">
      <form className="like-container" onSubmit={handleSubmit}>
        <button className="like-comment__btn grow">
          {commentLiked ? (
            <i className="fas fa-heart full-heart"></i>
          ) : (
            <i className="far fa-heart empty-heart"></i>
          )}
        </button>
        {commentLikes.likes.length > 0 ? (
          <NavLink
            to={`/photos/${photoId}/comments/${commentId}/likes`}
            className="likes-number grow"
            onClick={showCommentLikes}
          >
            {commentLikes.likes.length}
            {commentLikes.likes.length === 1 ? (
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

export default AddCommentLike;
