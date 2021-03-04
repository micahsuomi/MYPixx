import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.scss";

const CommentLike = ({
  userId, 
  name, 
  avatar,
}) => {
  return (
      <div className="comment-likeslist">
      <div className="comment-likeslist__image-container">
        {avatar === undefined || avatar === "" ? (
          <img
            src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
            alt={avatar}
          />
        ) : (
          <img src={avatar} alt={avatar} />
        )}
      </div>
      <NavLink to={`/user/${userId}`} className="comment-likeslist__user-name">
        <p>{name}</p>
      </NavLink>
    </div>
  );
};

export default CommentLike;

CommentLike.propTypes = {
  userId: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string
};