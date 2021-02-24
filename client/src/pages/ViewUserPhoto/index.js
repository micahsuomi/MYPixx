import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import ViewPhotoDetails from "../../components/ViewPhotoDetails";

import "./style.scss";

const ViewUserPhoto = (props) => {
  const { photos, users } = props;
  const id = props.match.params.id;
  const [userProfile, setUserProfile] = useState({});
  const [photo, setPhoto] = useState({});
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [slider, setSlider] = useState({
    index: "",
    prev: "",
    next: "",
  })

  const loadPhoto = async () => {
    try {
      const foundPhoto = await photos.find((photo) => photo._id === id);
      const foundUser = await users.find(
        (user) => user._id === foundPhoto.author.id
      );
      setPhoto(foundPhoto);
      setUserProfile(foundUser);
    } catch (err) {
      return err;
    }
  };
  
  /*
  const slider = {
    index: "",
    prev: "",
    next: "",
  };*/
//   console.log(userProfile);
  const loadSlider = async () => {
    try {
       await userProfile.photos.find((photo, index) => {
        const { photos } = userProfile;
        setSlider({
            index,
            prev: index === 0 ? "" : photos[index - 1]._id,
            next: index === photos.length - 1 ? "" : photos[index + 1]._id
        })
        /*
        slider.index = index;
        slider.prev = index === 0 ? "" : userProfile.photos[index - 1]._id;
        slider.next =
          index === userProfile.photos.length - 1
            ? ""
            : userProfile.photos[index + 1]._id;*/
        setPhotoLoaded(true);

        console.log(slider)
        return photo._id === id;
      });
    } catch (err) {
      console.log(err)
    }
  };

console.log(slider);

  useEffect(() => {
    loadPhoto();
  }, [loadPhoto]);

  useEffect(() => {
    if (userProfile) {
      loadSlider();
      console.log('slider here', slider)
    }
  }, [userProfile]);

  const {
    author,
    image,
    title,
    type,
    description,
    medium,
    createdAt,
    comments,
  } = photo;

  if (!photo || !userProfile) {
    return <h2>Not found</h2>;
  }
  return (
    <div className="viewphoto">
      {photoLoaded ? (
        <div className="viewphoto__nested-container">
          <div className="viewphoto__exit-header">
            <NavLink
              to={`/user/${author.id}`}
              className="viewphoto__back-to-photos grow"
            >
              <i className="fas fa-times fa-2x"></i>
            </NavLink>
          </div>
          <div className="viewphoto__wrapper">
            <div>
              {slider.prev !== "" && (
                  <NavLink to={slider.prev}>
                  <i className="fas fa-chevron-left fa-2x slider-arrow__left grow"></i>
                </NavLink>
              )}
            </div>
            <ViewPhotoDetails
              id={id}
              author={author}
              image={image}
              title={title}
              type={type}
              description={description}
              medium={medium}
              createdAt={createdAt}
              comments={comments}
              filteredPhoto={photo}
              history={props.history}
              match={props.match}
            />
            <div>
              {slider.next !== "" && (
                <NavLink to={slider.next}>
                  <i className="fas fa-chevron-right fa-2x slider-arrow__right grow"></i>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default ViewUserPhoto;
