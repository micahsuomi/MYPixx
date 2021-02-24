import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getPhotos } from "./redux/actions/photoActions";
import { getUsers } from "./redux/actions/userActions";
import Navbar from "./components/Navbar/index";
import Home from "./pages/Home";
import Community from "./pages/Community/index";
import Register from "./pages/Register/index";
import Login from "./pages/Login/index";
import User from "./pages/User";
import EditUser from "./components/EditUser/index";
import PhotoList from "./pages/Photos/index";
import AddPhoto from "./components/AddPhoto/index";
import ViewPhoto from "./pages/ViewPhoto/index";
import ViewUserPhoto from "./pages/ViewUserPhoto/index";
import LikesList from "./components/LikesList/index";
import PhotoComments from "./components/PhotoComments/index";
import EditPhoto from "./components/EditPhoto/index";
import DeletePhoto from "./components/DeletePhoto/index";
import Footer from "./components/Footer/index";

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
              isPopupOpen={isPopupOpen}
              isEditPopupOpen={isEditPopupOpen}
              closePopup={closePopup}
              {...props}
            />
          )}
        />

        <Route
          path="/view-user/:id/user-photos/:id"
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
          path="/photos/:id/likes"
          component={(props) => (
            <LikesList photos={photos} user={user} {...props} />
          )}
        />

        <Route
          path="/photos/:id/comments"
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
          path="/photos/:id"
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
          path="/photos"
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

        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
