import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import LikePhoto from "../../components/LikePhoto/index";

import "./style.scss";

const ViewPhoto = (props) => {
  let id = props.match.params.id;
  const [photoInfo, setPhotoInfo] = useState(false);

  // console.log(props.userProfile, props.isUserPage)
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
  console.log(filteredPhoto);
  let { isUserPage, userProfile } = props;

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
              {props.isAuthenticated &&
              filteredPhoto.author.id === props.user.user.id ? (
                <div className="viewphoto__edit-delete-wrapper">
                  <NavLink
                    to={`/editphoto/${id}`}
                    className="viewphoto__edit-photo-link"
                  >
                    <i className="fas fa-edit fa-2x"></i>
                  </NavLink>
                  <NavLink
                    to={`/deletephoto/${id}`}
                    className="viewphoto__delete-photo-link"
                  >
                    <i className="fas fa-trash fa-2x"></i>
                  </NavLink>
                </div>
              ) : (
                ""
              )}
            </div>
            <img
              src={filteredPhoto.image}
              alt={filteredPhoto.title}
              className="viewphoto__image"
            />
            <div className="viewphoto__body">
              <div className="viewphoto__author-info">
                <NavLink
                  to={`/user/${filteredPhoto.author.id}`}
                  className="viewphoto__author-link"
                >
                  <h3>{filteredPhoto.author.name}</h3>
                </NavLink>
                <div className="viewphoto__author-image-container">
                  {filteredPhoto.author.avatar === undefined ||
                  filteredPhoto.author.avatar === "" ? (
                    <img
                      src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                      alt={filteredPhoto.author.name}
                    />
                  ) : (
                    <img
                      src={filteredPhoto.author.avatar}
                      alt={filteredPhoto.author.name}
                    />
                  )}
                </div>
              </div>
              {photoInfo ? (
                <div className="viewphoto__info">
                  <h4>Title: {filteredPhoto.title}</h4>
                  <p>Type: {filteredPhoto.type}</p>
                  <p>
                    Technique:{" "}
                    {filteredPhoto.technique.map((t) => (
                      <span>{t} </span>
                    ))}
                  </p>
                  <p>Description: {filteredPhoto.description}</p>
                  <p>Uploaded on: {filteredPhoto.postedDate}</p>
                  <button
                    className="viewphoto__hide-info"
                    onClick={hidePhotoInfo}
                  >
                    Hide Info
                  </button>
                </div>
              ) : (
                <i
                  className="fas fa-info-circle fa-2x viewphoto__info-btn grow"
                  onClick={showPhotoInfo}
                ></i>
              )}
            </div>
            <div className="likephoto-comments__container">
              <div>
                <LikePhoto
                  filteredPhoto={filteredPhoto}
                  tokenConfig={() => props.tokenConfig()}
                  user={props.user}
                  token={props.token}
                  {...props}
                />
              </div>

              <div className="viewphoto__comments-link-container">
                <NavLink
                  to={`/photos/${id}/comments`}
                  className="comments-link"
                >
                  {filteredPhoto.comments.length < 1 ? (
                    <i className="far fa-comment fa-2x viewphoto__comments-icon"></i>
                  ) : (
                    <div className="comments-num__container">
                      <i className="far fa-comment fa-2x viewphoto__comments-icon"></i>
                      <div className="comments-length">
                        {filteredPhoto.comments.length}
                      </div>
                      {filteredPhoto.comments.length === 1 ? (
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
