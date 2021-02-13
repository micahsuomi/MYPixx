import React, { useState } from "react";

import PhotoItem from "../../components/PhotoItem";

import "./style.scss";

const UserProfile = ({ avatar, name, medium, bio, photos }) => {
  console.log("props are here", avatar, name, medium, bio, photos);
  const [isUserPage, setIsUserPage] = useState(false);

  return (
    <>
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
        <p>
          {medium !== undefined && medium.length > 0 ? (
            <p>
              {" "}
              Medium used:
              {medium.map((m) => (
                <span>{m} </span>
              ))}
            </p>
          ) : (
            <p>No medium listed</p>
          )}
        </p>
        <p>{bio}</p>
      </div>
      <div className="photo-gallery__container">
        <h1>User Gallery</h1>
        {photos !== undefined && photos.length < 1 ? (
              <h1>This user has not posted any pictures</h1>
            ) : (
              <h4>{photos.length} photos</h4>
            )}
              <div className="photo-gallery__wrapper">
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
    </>
  );
};

export default UserProfile;