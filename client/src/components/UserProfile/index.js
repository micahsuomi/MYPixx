import React from "react";
import PropTypes from "prop-types";

import PhotoItem from "../../components/PhotoItem";

import "./style.scss";

const UserProfile = ({
  avatar,
  name,
  medium,
  bio,
  photos,
  isUserPage,
  switchView,
}) => {
  return (
    <div className={switchView ? "user-switched" : "user-unswitched"}>
      <div className="user-details">
        <h1>{name}</h1>
        <div className="user-details__image-container">
          {avatar === undefined || avatar === "" ? (
            <img
              src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
              alt={name}
            />
          ) : (
            <img src={avatar} alt={name} />
          )}
        </div>
        <div>
          <h4 className="user-details__medium-header">Medium Used:</h4>
          {medium !== undefined && medium.length > 0 ? (
            <p>
              {medium.map((m) => (
                <span key={m}>{m} </span>
              ))}
            </p>
          ) : (
            <p>No medium listed</p>
          )}
        </div>
        <p>{bio}</p>
      </div>
      <div className="user-details__gallery">
        <h1>User Gallery</h1>
        {photos !== undefined && photos.length < 1 ? (
          <h1>This user has not posted any pictures</h1>
        ) : (
          <h4>{photos.length} photos</h4>
        )}
        <div className="user-details__photos">
          {photos.map((photo) => (
            <PhotoItem
              key={photo._id}
              id={photo._id}
              title={photo.title}
              image={photo.image}
              description={photo.description}
              author={photo.author.name}
              authorId={photo.author.id}
              authorImg={photo.author.avatar}
              likes={photo.likes}
              comments={photo.comments}
              isUserPage={isUserPage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  medium: PropTypes.array,
  bio: PropTypes.string,
  photos: PropTypes.array,
};
