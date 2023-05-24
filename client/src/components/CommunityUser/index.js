import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.scss";

const CommunityUser = ({ id, avatar, name, bio, photos }) => {
  return (
    <div className="community-user">
         <NavLink
              key={id}
              to={`/user/${id}`}
              className="community__users-link-container grow"
            >
      <div className="community-user__image-container">
        {avatar === undefined || avatar === "" ? (
          <img
            src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
            alt={name}
          />
        ) : (
          <img src={avatar} alt={name} />
        )}
      </div>
      <div className="community-user__body">
        <h4 className="community-user__name">{name}</h4>
        <ul className="community-user__details">
          {bio === undefined || bio === "" ? null : (
            <li>"{bio.substring(0, 40)}..."</li>
          )}
          {photos.length < 1 ? (
            <li>No photos</li>
          ) : (
            <li>
              {photos.length} {photos.length < 2 ? "photo" : "photos"}
            </li>
          )}
        </ul>
      </div>
      </NavLink>
    </div>
  );
};

export default CommunityUser;

CommunityUser.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  photos: PropTypes.array,
};

