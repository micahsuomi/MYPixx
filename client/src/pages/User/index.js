import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/actions/userActions";
import useUser from "../../hooks/useUser";
import PhotoItem from "../../components/PhotoItem";

import "./style.scss";

const User = (props) => {
  const [isUserPage, setIsUserPage] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const userProfile = useSelector((state) => state.users.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isUserLoaded = useSelector((state) => state.users.isUserLoaded);
  const errorMsg = useSelector((state) => state.users.errorMsg);
  const isErrShowing = useSelector((state) => state.users.isErrShowing);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const userId = props.match.params.id;
  useEffect(() => {
    if (!isAuthenticated) props.history.push("/login");
  }, []);

  useEffect(() => {
    // if (!isUserLoaded) {
      setTimeout(() => {
        dispatch(getUser(userId));
      }, 2000);
    // }
  }, [dispatch, userId]);

  useEffect(() => {
    if (!isUserLoaded) {
    setUser(userProfile)
  }
  }, [userProfile])
  /*
  const closePopup = () => {
    props.closePopup();
  };

  const refreshPage = () => {
    fetchUserData();
  };*/
  /*
  const foundUser = props.users.find((user) => {
    return user._id === props.match.params.id;
  });*/
  // console.log("found user", userProfile);
  // console.log('user profile', user)
  /*
  let formattedPhotos = foundUser.photos.map((photo) => (
    <PhotoItem
      key={photo._id}
      id={photo._id}
      name={photo.name}
      image={photo.image}
      description={photo.description}
      author={photo.author.name}
      authorId={photo.author.id}
      authorImg={photo.author.avatar}
      likes={photo.likes}
      comments={photo.comments}
      isUserPage={isUserPage}
      userProfile={userProfile}
    />
  ));*/
  console.log(userProfile);
  /*
  let formattedPhotos
  setTimeout(() => {
    console.log('photos a re', userProfile.photos)
    userProfile.photos.map((photo) => (
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
        userProfile={userProfile}
      />
      ));
  }, 4000);*/

  const closePopupOnClick = () => {
    props.closePopup();
  };

  /*
  let formattedPhotos
  useEffect(() => {
    if(isUserLoaded) {
      setTimeout(() => {
      (formattedPhotos = userProfile.photos.map((photo) => (
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
          userProfile={userProfile}
        />
      )))
    }, 3000)
  }
  }, []);*/

  const { avatar, name, email, medium, bio } = userProfile;

  if (!userProfile) {
    return (
      <div>
        <h3>Not Found</h3>
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <>
      {isUserLoaded ? (
        <div>
          <div className="user-details">
            <h1>
              {name}{" "}
              {isAuthenticated &&
                props.user.user.id === props.match.params.id &&
                "Dashboard"}
            </h1>
            <p>{email}</p>
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
              Mediums used:{" "}
              {userProfile.medium.map((m) => (
                <span>{m} </span>
              ))}
            </p>
            <p>{bio}</p>
            {isAuthenticated && props.user.user.id === props.match.params.id && (
              <div>
                <NavLink
                  to={`/edituser/${userId}`}
                  className="user-details__edit"
                >
                  <button className="user-details__update-btn grow">
                    Update Profile
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          {props.isEditPopupOpen && (
            <div className="photo-added__popup__container">
              <div className="photo-added__popup">
                <div className="photo-added__popup__header">
                  <i
                    className="fas fa-times-circle fa-2x grow"
                    onClick={closePopupOnClick}
                  ></i>
                </div>
                <div className="photo-added__popup__body">
                  <h3>User Profile Updated!</h3>
                </div>
              </div>
            </div>
          )}
          <div className="photo-gallery__container">
            <h1>User Gallery</h1>
            {userProfile.photos.length < 1 ? (
              <h1>This user has not posted any pictures</h1>
            ) : (
              <h4>{userProfile.photos.length} photos</h4>
            )}
            {isUserLoaded && (
              <div className="photo-gallery__wrapper">
                {userProfile.photos.map((photo) => (
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
                    userProfile={userProfile}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* {!isUserLoaded && errorMsg ? (
            <div className="error-container" style={{ height: "100vh" }}>
              <h3>Something went wrong. Refresh the page</h3>
              <button onClick={refreshPage} className="btn-refresh grow">
                <i className="fas fa-redo-alt fa-2x"></i>
              </button>
            </div>
          ) : ( */}
          <div className="loading-container" style={{ height: "100vh" }}>
            <h1>Loading User...</h1>
            <div className="lds-circle">
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
