import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/actions/userActions";
import useUser from "../../hooks/useUser";
import PhotoItem from "../../components/PhotoItem";

import "./style.css";

const User = (props) => {
  let { isAuthenticated } = props.user;
  const [isUserPage, setIsUserPage] = useState(false);
  const [err, user] = useUser()
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.users.user);
  const isUserLoaded = useSelector((state) => state.users.isUserLoaded);
  const errorMsg = useSelector((state) => state.users.errorMsg);
  const isErrShowing = useSelector((state) => state.users.isErrShowing);

  const userId = props.match.params.id;
 
  /*
  useEffect(() => {
     dispatch(getUser(userId));
   }, [dispatch]);*/
/*
  const closePopup = () => {
    props.closePopup();
  };

  const refreshPage = () => {
    fetchUserData();
  };*/
  
  const foundUser = props.users.find((user) => {
    return user._id === props.match.params.id
  })
  // console.log('found user', foundUser)
  // console.log('user profile', user)
  
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
  ))
  /*
  let formattedPhotos
  useEffect(() => {
    isUserLoaded
      ? (formattedPhotos = userProfile.photos.map((photo) => (
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
        )))
      : dispatch(getUser(userId))
  }, []);*/


    const { name, email, bio, avatar } = foundUser;
  
  if(!userProfile) {
    return (
      <h3>Not Foun</h3>

    )
  }
  return (
    <div>
      <h1>user page</h1>
      { !errorMsg ? (
        <div>
            <div className="user-details__wrapper">
              <h1>{name} {isAuthenticated ? 'Dashboard' : ''}</h1>
              <p>{email}</p>
              <div className="user-image-container">
                {avatar === undefined ||
                avatar === "" ? (
                  <img
                    src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                    alt={name}
                  />
                ) : (
                  <img src={avatar} alt={name} />
                )}
              </div>
              <p>{bio}</p>
              {isAuthenticated && props.user.user.id === props.match.params.id && 
              <div>
              <NavLink to={`/edituser/${userId}`} className="edit-user__link">
                <button className="profile-update__btn grow">
                  Update Profile
                </button>
              </NavLink>
              </div>
            
              }
          </div>

          {/* {props.isPopupOpen ? (
            <div className="photo-added__popup__container">
              <div className="photo-added__popup">
                <div className="photo-added__popup__header">
                  <i
                    className="fas fa-times-circle fa-2x grow"
                    onClick={closePopup}
                  ></i>
                </div>
                <div className="photo-added__popup__body">
                  <h3>User Profile Updated!</h3>
                </div>
              </div>
            </div>
          ) : null}  */}
          <div className="photo-gallery__container">
            <h1>User Gallery</h1>
            {foundUser.photos.length < 1 ? (
              <h1>This user has not posted any pictures</h1>
            ) : (
              <h4>{foundUser.photos.length} photos</h4>
            )} 
            <div className="photo-gallery__wrapper">{formattedPhotos}</div>
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
          ) : (
            <div className="loading-container" style={{ height: "100vh" }}>
              <h1>Loading User...</h1>
              <div className="lds-circle">
                <div></div>
              </div>
            </div>
          )} */}
        </div> 
      )} 
    </div>
  );
};

export default User;
