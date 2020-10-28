import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  getPhotos,
  getPhoto,
  editPhoto,
} from "../../redux/actions/photoActions";
import "../AddPhoto/style.css";
import "./style.css";

const EditPhoto = (props) => {
  const dispatch = useDispatch();
  const filteredPhoto = useSelector((state) => state.photos.photo);
  const [photo, setPhoto] = useState({
    photo: {
      name: "",
      image: "",
      description: "",
    },
  });
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getPhoto(id));
  }, [dispatch]);

  useEffect(() => {
    setPhoto(filteredPhoto);
    setPhotoLoaded(true);
  }, [filteredPhoto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    if (isImageChanged) {
      setPhoto(previewSource);
    }
    dispatch(editPhoto(id, photo));
    setTimeout(() => {
      props.history.push("/photos");
      dispatch(getPhotos());
    }, 3000);
  };

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setUpdatedImage(file);
    setFileInput(e.target.value);
    filePreview(file);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setPhoto({ ...photo, [name]: value });
  };

  const filePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      setPreviewSource(result);
      setIsImageChanged(true);
      setPhoto({
        image: result,
      });
    };
  };

  const openImageEditing = () => {
    setIsImageEditing(true);
    setPhoto({
      image: updatedImage,
    });
    console.log(image);
  };

  const cancelImage = () => {
    setIsImageEditing(false);
    setPreviewSource(null);
    setIsImageChanged(false);
  };

  let { name, image, description } = photo;
  return (
    <div className="edit-photo__container">
      <form
        onSubmit={handleSubmit}
        className="add-photo__form edit-photo__form animate-modal"
      >
        <div className="cancel-wrapper">
          <NavLink to="/photos" className="delete-link">
            <i className="fas fa-times-circle fa-2x"></i>
          </NavLink>
        </div>
        <h2>Edit Photo</h2>

        {photoLoaded ? (
          <div>
            <div className="input-topics">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="name"
                onChange={handleChange}
              />
            </div>
            {!isImageChanged ? (
              <div>
                <div className="input-topics">
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    name="image"
                    value={image}
                    placeholder="image link"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="edit-image__preview__container">
                  <img
                    src={image}
                    alt="current user profile"
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
            ) : null}

            {!isImageEditing ? (
              <div className="change-photo__container">
                <button
                  onClick={openImageEditing}
                  className="change-photo grow"
                >
                  Change
                </button>
              </div>
            ) : null}

            {isImageEditing || isImageChanged ? (
              <div>
                <div className="input-topics">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    required
                    onChange={fileSelectedHandler}
                  />
                </div>
                {previewSource && (
                  <div className="edit-image__preview__container">
                    <img
                      src={previewSource}
                      alt="chosen"
                      style={{ height: "200px" }}
                    />
                    <button
                      className="edit-image__cancel grow"
                      onClick={cancelImage}
                    >
                      Remove
                    </button>
                  </div>
                )}{" "}
                {!isImageChanged ? (
                  <div className="buttons-wrapper">
                    <button
                      className="edit-image__cancel grow"
                      onClick={cancelImage}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="input-topics">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                placeholder="description"
                onChange={handleChange}
              />
            </div>

            <div className="btn-save__wrapper">
              <button className="btn-save">Submit</button>
            </div>
          </div>
        ) : (
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPhoto;
