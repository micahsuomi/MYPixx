import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/actions/userActions";
import CurrentUser from "../../components/CurrentUser";
import UserProfile from "../../components/UserProfile";

import "./style.scss";

const User = (props) => {
  // console.log('props are here', props)
  const [isUserPage, setIsUserPage] = useState(false);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  const [currentUserProfile, setCurrentUserProfile] = useState({});

  // const [err, userTest] = useUser(props.user._id);
  // console.log('from hooks', userTest)
  const currentState = useSelector((state) => state);
  const currentUser = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [userLoaded, setUserLoaded] = useState(false);

  const loadUser = async () => {
    try {
      const user = props.users.find((user) => user._id === props.match.params.id);
      setUserProfile(user);
      setUserLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated || currentUser._id !== props.match.params.id) {
      loadUser();
    } else {
      setCurrentUserProfile(currentUser);
      setUserLoaded(true);
      console.log("current user", currentUserProfile);
    }
  }, [isAuthenticated, dispatch, getUser, props.match.params.id]);

  const closePopup = () => {
    props.closePopup();
  };

  const { avatar, name, medium, bio, photos } = userProfile;
  console.log('current user', currentUserProfile)
  if (!userProfile || !currentUserProfile) {
    return (
      <div>
        <h3>Not Found</h3>
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <>
      {userLoaded ? (
        <>
          {isAuthenticated && currentUserProfile._id === props.match.params.id ? (
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
            />
          ) : (
            <UserProfile
              avatar={avatar}
              name={name}
              medium={medium}
              bio={bio}
              photos={photos}
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
