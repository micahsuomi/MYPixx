import React from "react";
import { NavLink } from "react-router-dom";

import ViewPhotoDetails from "../../components/ViewPhotoDetails";

import "./style.scss";

const ViewPhoto = (props) => {
  const id = props.match.params.id;

  const slider = {
    index: "",
    prev: "",
    next: "",
  };

  const filteredPhoto = props.photos.find((photo, index) => {
    slider.index = index;
    slider.prev = index === 0 ? "" : props.photos[index - 1]._id;
    slider.next =
      index === props.photos.length - 1 ? "" : props.photos[index + 1]._id;
    return photo._id === id;
  });

  const {
    author,
    image,
    title,
    type,
    description,
    medium,
    createdAt,
    comments,
  } = filteredPhoto;

  return (
    <div className="viewphoto">
      <div className="viewphoto__nested-container">
        <div className="viewphoto__exit-header">
          <NavLink to="/" className="viewphoto__back-to-photos grow">
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
            filteredPhoto={filteredPhoto}
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
    </div>
  );
};

export default ViewPhoto;
