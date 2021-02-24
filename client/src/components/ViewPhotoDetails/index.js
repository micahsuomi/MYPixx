import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import LikePhoto from "../../components/LikePhoto/index";

import "./style.scss";

const ViewPhotoDetails = (
  {
    id,
    author,
    image,
    title,
    type,
    description,
    medium,
    createdAt,
    comments,
    filteredPhoto,
    history,
    match,
  },
  props
) => {
  const [photoInfo, setPhotoInfo] = useState(false);
  const [openEditDeleteNav, setOpenEditDeleteNav] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  const showPhotoInfo = () => {
    setPhotoInfo(true);
  };
  const hidePhotoInfo = () => {
    setPhotoInfo(false);
  };

  const openEditDeleteNavClick = () => {
    setOpenEditDeleteNav(!openEditDeleteNav);
  };

  return (
          <div className="viewphoto__container">
            <div className="viewphoto__header">
              {isAuthenticated && author.id === user._id && (
                <>
                  <i
                    className={
                      !openEditDeleteNav
                        ? "fas fa-chevron-down grow2"
                        : "fas fa-chevron-up grow2"
                    }
                    onClick={openEditDeleteNavClick}
                    style={{
                      cursor: "pointer",
                      color: "rgb(139, 119, 119)",
                      fontSize: "22px",
                    }}
                  ></i>
                  {openEditDeleteNav && (
                    <div className="viewphoto__edit-delete-wrapper animate-modal">
                      <NavLink
                        to={`/editphoto/${id}`}
                        className="viewphoto__edit-photo-link grow2"
                      >
                        <span>Edit</span>
                        <i className="fas fa-edit"></i>
                      </NavLink>
                      <NavLink
                        to={`/deletephoto/${id}`}
                        className="viewphoto__delete-photo-link grow2"
                      >
                        <span>Delete</span>
                        <i className="fas fa-trash"></i>
                      </NavLink>
                    </div>
                  )}
                </>
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
                  history={history}
                  match={match}
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
  );
};

export default ViewPhotoDetails;
