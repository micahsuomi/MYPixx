import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/actions/userActions";
import CurrentUser from "../../components/CurrentUser";
import UserProfile from "../../components/UserProfile";

import "./style.scss";

const User = (props) => {
  const [isUserPage, setIsUserPage] = useState(false);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const currentUser = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [userLoaded, setUserLoaded] = useState(false);
  const [switchView, setSwitchView] = useState(false);

  const loadUser = async () => {
    try {
      const user = props.users.find(
        (user) => user._id === props.match.params.id
      );
      setUserProfile(user);
      setUserLoaded(true);
      console.log(userProfile);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentUser._id === props.match.params.id) {
      setCurrentUserProfile(currentUser);
      console.log(currentUser);
      setIsUserPage(true);
      setUserLoaded(true);
    } else {
      loadUser();
      setIsUserPage(true);
    }
  }, [isAuthenticated, dispatch, currentUser, props.match.params.id]);

  const closePopup = () => {
    props.closePopup();
  };

  const switchViewOnClick = () => {
    setSwitchView(!switchView);
  };
  const { avatar, name, medium, bio, photos } = userProfile;

  if (!userProfile || !currentUserProfile) {
    return (
      <div>
        <h3>Not Found</h3>
        <h3>Please refresh the page</h3>
      </div>
    );
  }
  return (
    <>
      {userLoaded ? (
        <>
          {window.innerWidth > 1024 && (
            <button className="switch-view-btn" onClick={switchViewOnClick}>
              Switch View
            </button>
          )}
          {isAuthenticated &&
          currentUserProfile._id === props.match.params.id ? (
            <CurrentUser
              id={currentUserProfile._id}
              avatar={currentUserProfile.avatar}
              name={currentUserProfile.name}
              email={currentUserProfile.email}
              medium={currentUserProfile.medium}
              bio={currentUserProfile.bio}
              photos={currentUserProfile.photos}
              isEditPopupOpen={props.isEditPopupOpen}
              closePopup={closePopup}
              user={currentUserProfile}
              isUserPage={isUserPage}
              switchView={switchView}
            />
          ) : (
            <UserProfile
              avatar={avatar}
              name={name}
              medium={medium}
              bio={bio}
              photos={photos}
              user={currentUser}
              isUserPage={isUserPage}
              switchView={switchView}
            />
          )}
        </>
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
