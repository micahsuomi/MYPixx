import React from "react";
import { NavLink } from "react-router-dom";

import CommunityHeader from "../../components/CommunityHeader/index";
import CommunityMostCommented from "../../components/CommunityMostCommented/index";
import CommunityMostLiked from "../../components/CommunityMostLiked";
import CommunityUser from "../../components/CommunityUser/index";

import "./style.scss";

const Community = ({ users, photos }) => {
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

  return (
    <div className="community">
      <CommunityHeader />
      <div className="community__most-commented">
        <h4>Most Commented</h4>
        <div className="community__most-commented-wrapper">
          {sortedByLikes.map((photo) => (
            <NavLink
              key={photo._id}
              to={`/photo/${photo._id}`}
              className="community__most-commented-link"
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

      <div className="community__most-liked">
        <h4>Most Liked</h4>
        <div className="community__most-liked-wrapper">
          {sortedByComments.map((photo) => (
            <NavLink
              key={photo._id}
              to={`/photo/${photo._id}`}
              className="community__most-liked-link"
            >
              <CommunityMostLiked
                key={photo._id}
                image={photo.image}
                name={photo.name}
                author={photo.author}
                likes={photo.likes}
              />
            </NavLink>
          ))}
        </div>
      </div>

      <div className="community__users">
        <h4>Active Users</h4>
        <div className="community__users-wrapper">
          {users.map((user) => (
            <NavLink
              key={user._id}
              to={`/user/${user._id}`}
              className="community__users-link-container grow"
            >
              <CommunityUser
                key={user._id}
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
