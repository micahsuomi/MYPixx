import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Like from "./LikeItem";
import "./style.css";

const LikesList = (props) => {
  const [likes, setLikes] = useState([]);

  useEffect = () => {
    const id = props.match.params.id;
    const url = `/api/v1/photos/${id}/likes`;
    axios.get(url).then((res) => setLikes(res.data));
  };

  const formattedLikes = likes.map((like) => (
    <Like
      key={like._id}
      userId={like._id}
      name={like.name}
      avatar={like.avatar}
    />
  ));
  return (
    <div className="likes-container">
      <div className="likes-wrapper">
        <div className="likes-header">
          <NavLink to={`/photos/${this.props.match.params.id}`}>
            <i className="fas fa-chevron-left fa-2x grow"></i>
          </NavLink>
        </div>
        <h3>
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </h3>
        {formattedLikes}
      </div>
    </div>
  );
};

export default LikesList;
