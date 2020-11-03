import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

const PhotoItemAuthor = ({ authorId, author, authorImg }) => {
  return (
    <div className="author">
      <div className="author__image-container">
        {authorImg === undefined || authorImg === "" ? (
          <img
            src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
            alt={author}
          />
        ) : (
          <img src={authorImg} alt={author} />
        )}
      </div>
      <p className="author__name grow">
        <NavLink to={`/user/${authorId}`} className="author__link">
          {author}
        </NavLink>
      </p>
    </div>
  );
};

export default PhotoItemAuthor;
