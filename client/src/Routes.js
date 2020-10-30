import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "./redux/actions/authActions";
import { getPhotos } from "./redux/actions/photoActions";
import Navbar from "./components/Navbar/index";
import Home from "./pages/Home";
import Community from "./pages/Community/index";
import Register from "./components/Register/index";
import Login from "./components/Login/index";
import User from "./pages/User";
import EditUser from "./components/EditUser/index";
import PhotoList from "./pages/Photos/index";
import AddPhoto from "./components/AddPhoto/index";
import ViewPhoto from "./pages/ViewPhoto/index";
import LikePhoto from "./components/LikePhoto/index";
import LikesList from "./components/LikesList/index";
import PhotoComments from "./components/PhotoComments/index";
import Comment from "./components/Comment/index";
import LikeComment from "./components/LikeComment/index";
import EditPhoto from "./components/EditPhoto/index";
import DeletePhoto from "./components/DeletePhoto/index";
import Footer from "./components/Footer/index";
import useUsers from "./hooks/useUsers";
import { getUsers, getUser } from "./redux/actions/userActions";

import "./App.css";

export const Routes = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const users = useSelector((state) => state.users.users);
  const userPhotos = useSelector((state) => state.users.userPhotos);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth);
  const loadedUser = useSelector((state) => state.users.user);

  const [msg, setMsg] = useState("");
  const [isErrorShowing, setIsErrorShowing] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [isPhotoPage, setIsPhotoPage] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPhotoAdded, setIsPhotoAdded] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    dispatch(getPhotos());
    dispatch(getUsers());
  }, [dispatch]);

  

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsEditPopupOpen(false);
    // fetchUsers();
    loadUser();
  };
  return (
    <div className="wrapper">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        isLoading={isLoading}
      />

      <Switch>
        <Route
          path="/community"
          component={(props) => (
            <Community users={users} photos={photos} {...props} />
          )}
        />

        <Route
          path="/register"
          component={(props) => <Register user={user} msg={msg} {...props} />}
        />

        <Route
          path="/login"
          component={(props) => (
            <Login isAuthenticated={isAuthenticated} msg={msg} {...props} />
          )}
        />

        <Route
          path="/edituser/:id"
          component={(props) => (
            <EditUser
              id={props.match.params.id}
              users={users}
              user={user}
              {...props}
            />
          )}
        />

        <Route
          path="/user/:id"
          component={(props) => (
            <User
              id={props.match.params.id}
              user={user}
              users={users}
              photos={photos}
              isPopupOpen={isPopupOpen}
              closePopup={closePopup}
              {...props}
            />
          )}
        />

        <Route
          path="/editphoto/:id"
          component={(props) => (
            <EditPhoto photos={photos} {...props} />
          )}
        />

        <Route
          path="/deletephoto/:id"
          component={(props) => <DeletePhoto {...props} />}
        />

        <Route
          path="/photos/:id/likes"
          component={(props) => (
            <LikesList photos={photos} user={user} {...props} />
          )}
        />

        <Route
          path="/photos/:id/comments"
          component={(props) => (
            <PhotoComments
              photos={photos}
              user={user}
              isAuthenticated={isAuthenticated}
              {...props}
            />
          )}
        />

        {/* <Route
          path="/photos/:id/like"
          component={(props) => (
            <LikePhoto photos={photos} user={user} {...props} />
          )}
        /> */}

        {/* <Route
          path="/photos/:id/comments/:id/like"
          component={(props) => (
            <LikeComment
              photos={photos}
              user={user}
              tokenConfig={tokenConfig}
              {...props}
            />
          )}
        /> */}

        <Route
          path="/addphoto"
          component={(props) => (
            <AddPhoto
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
              {...props}
            />
          )}
        />

        <Route
          path="/photos/:id"
          component={(props) => (
            <ViewPhoto
              photos={photos}
              user={user}
              users={users}
              isAuthenticated={isAuthenticated}
              isUserPage={isUserPage}
              userProfile={userProfile}
              {...props}
            />
          )}
        />

        <Route
          path="/photos/:id/comments/:id"
          component={(props) => <Comment {...props} />}
        />

        <Route
          path="/photos"
          component={(props) => (
            <div>
              <PhotoList
                key={props.match.params.id}
                photos={photos}
                isAuthenticated={isAuthenticated}
                isErrorShowing={isErrorShowing}
                isPhotoAdded={isPhotoAdded}
                isPopupOpen={isPopupOpen}
                isEditPopupOpen={isEditPopupOpen}
                closePopup={closePopup}
                {...props}
              />
            </div>
          )}
        />

        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
