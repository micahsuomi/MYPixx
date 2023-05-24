import React from "react";
import { NavLink } from "react-router-dom";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import CommunityHeader from "../../components/CommunityHeader/index";
import CommunityMostCommented from "../../components/CommunityMostCommented/index";
import CommunityMostLiked from "../../components/CommunityMostLiked";
import CommunityUser from "../../components/CommunityUser/index";

import "./style.scss";

const Community = ({ users, photos }) => {
  console.log("photos", photos)
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
        <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
                >
                    <Masonry columnsCount={4} gutter="1rem">
                    {sortedByLikes.map((photo) => (
            <NavLink
              key={photo._id}
              to={`/photo/${photo._id}`}
              className="community__most-commented-link"
            >
              <CommunityMostCommented
                key={photo._id}
                image={photo.image}
                title={photo.title}
                author={photo.author}
                comments={photo.comments}
              />
            </NavLink>
          ))}                    </Masonry>
                </ResponsiveMasonry>
     
      </div>

      <div className="community__most-liked">
        <h4>Most Liked</h4>
        <ResponsiveMasonry
                     columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
                >
                    <Masonry columnsCount={4} gutter="1rem">
                    {sortedByComments.map((photo) => (
            <NavLink
              key={photo._id}
              to={`/photo/${photo._id}`}
              className="community__most-liked-link"
            >
              <CommunityMostLiked
                key={photo._id}
                image={photo.image}
                title={photo.title}
                author={photo.author}
                likes={photo.likes}
              />
            </NavLink>
          ))}                    </Masonry>
                </ResponsiveMasonry>
  
      </div>

      <div className="community__users">
        <h4>Active Users</h4>
        <div className="community__users-wrapper">
          {users.map((user) => (
              <CommunityUser
                key={user._id}
                id={user._id}
                name={user.name}
                avatar={user.avatar}
                bio={user.bio}
                photos={user.photos}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
