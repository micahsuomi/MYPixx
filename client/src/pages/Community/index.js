import React from "react";

import { NavLink } from "react-router-dom";
import CommunityHeader from "../../components/CommunityHeader/index";
import CommunityMostCommented from "../../components/CommunityMostCommented/index";
import CommunityMostLiked from "../../components/CommunityMostLiked";
import CommunityUser from "../../components/CommunityUser/index";

import "./style.css";

const Community = ({ users, photos }) => {
  console.log(users);
  const sortedByLikes = photos.sort((a, b) => {
    if (a.likes.length > b.likes.length) return -1;
    if (b.likes.length < a.likes.length) return 1;
    return 0;
  });

  const sortedByComments = photos.sort((a, b) => {
    if (a.comments.length > b.comments.length) return -1;
    if (b.comments.length < a.comments.length) return 1;
    return 0;
  });

  sortedByLikes.length = 8;
  sortedByComments.length = 8;
  console.log(users)
  return (
    <div className="about-container">
      <CommunityHeader />
      <div className="most-liked-photos__container">
        <h4>Most Commented</h4>
        <div className="most-liked-photos__wrapper">
          {sortedByLikes.map((photo) => (
            <NavLink
              to={`/photos/${photo._id}`}
              className="most-liked-photos__link"
            >
              <CommunityMostCommented
                key={photo._id}
                image={photo.image}
                name={photo.name}
                author={photo.author}
                comments={photo.comments}
              />
            </NavLink>
          ))}
        </div>
      </div>

      <div className="most-liked-photos__container">
        <h4>Most Liked</h4>
        <div className="most-liked-photos__wrapper">
          {sortedByComments.map((photo) => (
            <NavLink
              to={`/photos/${photo._id}`}
              className="most-liked-photos__link"
            >
              <CommunityMostLiked
                image={photo.image}
                name={photo.name}
                author={photo.author}
                likes={photo.likes}
              />
            </NavLink>
          ))}
        </div>
      </div>

      <div className="users-container">
        <h4>Our Users</h4>
        <div className="users-wrapper">
          {users.map((user) => (
            <NavLink
              to={`/user/${user._id}`}
              className="user-link__container grow"
            >
              <CommunityUser
                name={user.name}
                avatar={user.avatar}
                bio={user.bio}
                photos={user.photos}
              />
            </NavLink>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default Community;
