import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import "./style.scss";

const CommunityHeader = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <div className="community-header">
      <h1>MYPixx Community</h1>
      <div className="community-header__paragraph">
        <p>
          MyPixx is a social community for artists and inspiring artists. If you
          love art and want to share it with your peers, you found the right
          place! <br></br>
            Join a community of talented artits. Each of us is unique and has
            his or her own talents. Are you into photography or prints? Great,
            join us. Are you a painter, whether is portraits, or abstracts?
            Awesome! Are you into digital art or street art? Join us! Are you a
            sculpturist? Join us!{" "}
          {!isAuthenticated && (
            <div className="community-header__btn-container">
              <NavLink to="/register" className="community-header__link">
                <button>Join Today</button>
              </NavLink>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default CommunityHeader;
