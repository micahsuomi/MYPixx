import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getPhotos } from "./redux/actions/photoActions";
import { getUsers } from "./redux/actions/userActions";
import Navbar from "./components/Navbar";
import Community from "./pages/Community";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import EditUser from "./components/EditUser";
import PhotoList from "./pages/Photos";
import AddPhoto from "./components/AddPhoto";
import ViewPhoto from "./pages/ViewPhoto";
import ViewUserPhoto from "./pages/ViewUserPhoto";
import LikesList from "./components/LikesList";
import PhotoComments from "./components/PhotoComments";
import EditPhoto from "./components/EditPhoto";
import DeletePhoto from "./components/DeletePhoto";
import Footer from "./components/Footer";

import "./App.css";

const Routes = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photo.photos);
  const users = useSelector((state) => state.user.users);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    dispatch(getPhotos());
    dispatch(getUsers());
  }, [dispatch]);

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsEditPopupOpen(false);
    dispatch(getUsers());
  };
  const openUserPopup = () => {
    setIsEditPopupOpen(true);
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
          component={(props) => <Register history={props.history} {...props} />}
        />

        <Route
          path="/login"
          component={(props) => (
            <Login isAuthenticated={isAuthenticated} {...props} />
          )}
        />

        <Route
          path="/edituser/:id"
          component={(props) => (
            <EditUser
              id={props.match.params.id}
              users={users}
              user={user}
              openUserPopup={openUserPopup}
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
              isEditPopupOpen={isEditPopupOpen}
              closePopup={closePopup}
              {...props}
            />
          )}
        />

        <Route
          path="/view-user/:id/user-photo/:id"
          component={(props) => (
            <ViewUserPhoto
              photos={photos}
              user={user}
              users={users}
              isAuthenticated={isAuthenticated}
              {...props}
            />
          )}
        />

        <Route
          path="/editphoto/:id"
          component={(props) => <EditPhoto photos={photos} {...props} />}
        />

        <Route
          path="/deletephoto/:id"
          component={(props) => (
            <DeletePhoto
              id={props.match.params.id}
              history={props.history}
              {...props}
            />
          )}
        />

        <Route
          path="/photo/:id/likes"
          component={(props) => (
            <LikesList photos={photos} user={user} {...props} />
          )}
        />

        <Route
          path="/photo/:id/comments"
          component={(props) => (
            <PhotoComments
              user={user}
              users={users}
              isAuthenticated={isAuthenticated}
              match={props.match}
              history={props.history}
              {...props}
            />
          )}
        />

        <Route
          path="/addphoto"
          component={(props) => <AddPhoto history={props.history} {...props} />}
        />

        <Route
          path="/photo/:id"
          component={(props) => (
            <ViewPhoto
              photos={photos}
              user={user}
              users={users}
              isAuthenticated={isAuthenticated}
              {...props}
            />
          )}
        />

        <Route
          path="/"
          component={(props) => (
            <div>
              <PhotoList
                key={props.match.params.id}
                photos={photos}
                isAuthenticated={isAuthenticated}
                isPopupOpen={isPopupOpen}
                isEditPopupOpen={isEditPopupOpen}
                closePopup={closePopup}
                {...props}
              />
            </div>
          )}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
