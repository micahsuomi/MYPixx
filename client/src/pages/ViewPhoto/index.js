import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import LikePhoto from "../../components/LikePhoto/index";

import "./style.scss";

const ViewPhoto = (props) => {
  const id = props.match.params.id;
  const { isUserPage, userProfile } = props
  const [photoInfo, setPhotoInfo] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  console.log(props.userProfile, props.isUserPage)
  // console.log(Boolean(props.userProfile))
  // console.log(Boolean(props.userPage))

  const slider = {
    index: "",
    prev: "",
    next: "",
  };

  let filteredPhoto;
  if (props.isUserPage && props.userProfile) {
    console.log("it is user page");
    filteredPhoto = props.userProfile.photos.find((photo, index) => {
      slider.index = index;
      slider.prev = index === 0 ? "" : props.userProfile.photos[index - 1]._id;
      slider.next =
        index === props.userProfile.photos.length - 1
          ? ""
          : props.userProfile.photos[index + 1]._id;

      return photo._id === id;
    });
  } else {
    console.log("not user page");
    filteredPhoto = props.photos.find((photo, index) => {
      slider.index = index;
      slider.prev = index === 0 ? "" : props.photos[index - 1]._id;
      slider.next =
        index === props.photos.length - 1 ? "" : props.photos[index + 1]._id;
      return photo._id === id;
    });
  }

  const showPhotoInfo = () => {
    setPhotoInfo(true);
  };
  const hidePhotoInfo = () => {
    setPhotoInfo(false);
  };

  const {
    author,
    image,
    title,
    type,
    description,
    medium,
    createdAt,
    comments,
  } = filteredPhoto;

  return (
    <div className="viewphoto">
      <div className="viewphoto__nested-container">
        <div className="viewphoto__exit-header">
          {!isUserPage ? (
            <NavLink to="/photos" className="viewphoto__back-to-photos grow">
              <i className="fas fa-times fa-2x"></i>
            </NavLink>
          ) : (
            <NavLink
              to={`/user/${userProfile._id}`}
              className="viewphoto__back-to-photos grow"
            >
              <i className="fas fa-times fa-2x"></i>
            </NavLink>
          )}
        </div>
        <div className="viewphoto__wrapper">
          <div>
            {slider.prev !== "" ? (
              <NavLink to={slider.prev}>
                <i className="fas fa-chevron-left fa-2x slider-arrow__left grow"></i>
              </NavLink>
            ) : (
              ""
            )}
          </div>
          <div className="viewphoto__container">
            <div className="viewphoto__header">
              {isAuthenticated && author.id === user._id ? (
                <div className="viewphoto__edit-delete-wrapper">
                  <NavLink
                    to={`/editphoto/${id}`}
                    className="viewphoto__edit-photo-link"
                  >
                    <i className="fas fa-edit"></i>
                  </NavLink>
                  <NavLink
                    to={`/deletephoto/${id}`}
                    className="viewphoto__delete-photo-link"
                  >
                    <i className="fas fa-trash"></i>
                  </NavLink>
                </div>
              ) : (
                ""
              )}
            </div>
            <img src={image} alt={title} className="viewphoto__image" />
            <div className="viewphoto__body">
              <div className="viewphoto__author-info">
                <NavLink
                  to={`/user/${author.id}`}
                  className="viewphoto__author-link"
                >
                  <h3>{author.name}</h3>
                </NavLink>
                <div className="viewphoto__author-image-container">
                  {author.avatar === undefined || author.avatar === "" ? (
                    <img
                      src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                      alt={author.name}
                    />
                  ) : (
                    <img src={author.avatar} alt={author.name} />
                  )}
                </div>
              </div>
              {photoInfo ? (
                <div className="viewphoto__info animate-modal">
                  <h4>Title: {title}</h4>
                  <p>Type: {type}</p>
                  <p>
                    Tags:{" "}
                    {medium.map((t) => (
                      <span>{`${t}`} </span>
                    ))}
                  </p>
                  <p>Description: {description}</p>
                  <p>Uploaded on: {moment(createdAt).format("LL")}</p>
                  <button
                    className="viewphoto__hide-info"
                    onClick={hidePhotoInfo}
                  >
                    Hide Info
                  </button>
                </div>
              ) : (
                <div className="viewphoto__show-info">
                  <i
                    className="fas fa-info-circle fa-2x viewphoto__info-btn grow"
                    onClick={showPhotoInfo}
                  ></i>
                  <span>Show Info</span>
                </div>
              )}
            </div>
            <div className="likephoto-comments__container">
              <div>
                <LikePhoto
                  filteredPhoto={filteredPhoto}
                  user={user}
                  {...props}
                />
              </div>

              <div className="viewphoto__comments-link-container">
                <NavLink
                  to={`/photos/${id}/comments`}
                  className="comments-link"
                >
                  {comments.length < 1 ? (
                    <i className="far fa-comment fa-2x grow2 viewphoto__comments-icon"></i>
                  ) : (
                    <div className="comments-num__container">
                      <i className="far fa-comment fa-2x grow2 viewphoto__comments-icon"></i>
                      <div className="comments-length">{comments.length}</div>
                      {comments.length === 1 ? (
                        <span> Comment</span>
                      ) : (
                        <span> Comments</span>
                      )}
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
          </div>
          <div>
            {slider.next !== "" ? (
              <NavLink to={slider.next}>
                <i className="fas fa-chevron-right fa-2x slider-arrow__right grow"></i>
              </NavLink>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPhoto;
