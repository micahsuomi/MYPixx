import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getPhotoLikes } from "../../redux/actions/photoActions";
import Like from "./LikeItem";

import "./style.scss";

const LikesList = (props) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState([]);
  const photoLikes = useSelector((state) => state.photos.likes);

  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getPhotoLikes(id));
  }, [dispatch]);

  useEffect(() => {
    setLikes(photoLikes);
  }, [photoLikes]);

  console.log(likes);

  const formattedLikes = likes.map((like) => (
    <Like
      key={like._id}
      userId={like._id}
      name={like.name}
      avatar={like.avatar}
    />
  ));
  return (
    <div className="likes">
      <div className="likes__wrapper">
        <div className="likes__header">
          <NavLink to={`/photos/${props.match.params.id}`}>
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
