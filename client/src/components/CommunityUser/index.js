import React from "react";

import "./style.scss";

const CommunityUser = ({ avatar, name, bio, photos }) => {

  return (
    <div className="community-user">
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
    </div>
  );
};

export default CommunityUser;
