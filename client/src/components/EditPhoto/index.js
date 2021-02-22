import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import {
  getPhotos,
  getPhoto,
  editPhoto,
} from "../../redux/actions/photoActions";

import "../AddPhoto/style.scss";
import "./style.scss";

const EditPhoto = (props) => {
  const dispatch = useDispatch();
  const filteredPhoto = useSelector((state) => state.photo.photo);
  const [photo, setPhoto] = useState({
    photo: {
      image: "",
      title: "",
      type: "",
      medium: "",
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
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [warning, setWarning] = useState("");

  const { title, image, type, medium, description } = photo;

  const id = props.match.params.id;

  const [mediumArr, setMediumArr] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
    dispatch(getPhoto(id));
  }, [dispatch]);

  useEffect(() => {
    if (!photoLoaded) {
      dispatch(getPhoto(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setPhoto({ ...filteredPhoto });
    setMediumArr(filteredPhoto.medium);
    setPhoto({ ...filteredPhoto, medium: "" });
    setPhotoLoaded(true);
  }, [filteredPhoto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    photo.medium = mediumArr;

    if (isImageChanged) {
      setPhoto({ ...photo, image: previewSource, medium: mediumArr });
    }

    dispatch(editPhoto(id, photo));
    setTimeout(() => {
      props.history.push("/photos");
      setTimeout(() => {
        dispatch(getPhotos());
      }, 2000);
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
      console.log("before file preview", photo);
      photo.image = result;
      setPhoto({
        ...photo,
        image: result,
      });
    };
  };

  const openImageEditing = () => {
    setIsImageEditing(true);
    setPhoto({
      ...photo,
    });
  };

  const cancelImage = () => {
    setIsImageEditing(false);
    setPreviewSource(null);
    setIsImageChanged(false);
  };

  const addToMedium = (e) => {
    e.preventDefault();
    let mediumIndex = mediumArr.indexOf(medium);
    if (medium.length < 1) {
      setWarning("Please enter a value");
    }
    if (mediumIndex !== -1) {
      setWarning("Tag already present");
    } else {
      setMediumArr([...mediumArr, medium]);
      setPhoto({ ...photo, medium: "" });
      setWarning("");
    }
  };

  const deleteMedium = (t) => {
    const tecniqueIndex = mediumArr.indexOf(t);
    mediumArr.splice(tecniqueIndex, 1);
    setMediumArr([...mediumArr]);
  };

  if (!photoLoaded) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="edit-photo">
      {photoLoaded && mediumArr !== undefined ? (
        <form
          onSubmit={handleSubmit}
          className="edit-photo__form animate-modal"
        >
          <div className="edit-photo__cancel-wrapper">
            <NavLink to="/photos" className="delete-link">
              <i className="fas fa-times-circle fa-2x"></i>
            </NavLink>
          </div>
          <h2>Edit Photo</h2>

          <div>
            {!isImageChanged && (
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
                <div className="edit-photo__preview-container">
                  <img
                    src={image}
                    alt="current photo"
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
            )}

            {!isImageEditing && (
              <div className="edit-photo__change-photo-container">
                <button
                  onClick={openImageEditing}
                  className="edit-photo__change-photo grow"
                >
                  Change
                </button>
              </div>
            )}

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
                  <div className="edit-photo__preview-container">
                    <img
                      src={previewSource}
                      alt="chosen"
                      style={{ height: "200px" }}
                    />
                    <button
                      className="edit-photo__cancel grow"
                      onClick={cancelImage}
                    >
                      Remove
                    </button>
                  </div>
                )}{" "}
                {!isImageChanged && (
                  <div className="buttons-wrapper">
                    <button
                      className="edit-photo__cancel grow"
                      onClick={cancelImage}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            <div className="input-topics">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="title"
                onChange={handleChange}
              />
            </div>

            <div className="input-topics">
              <label htmlFor="type">Type</label>
              <select name="type" value={type} onChange={handleChange}>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="photography">Photography</option>
                <option value="abstract">Abstract</option>
                <option value="street art">Street Art</option>
                <option value="digital">Digital</option>
              </select>
            </div>

            <div className="input-topics">
              <label htmlFor="medium">Tags</label>
              <div className="input-topics-medium">
                <input
                  type="text"
                  name="medium"
                  value={medium}
                  placeholder={
                    "eg(oil, acrylics, dripping, analog photography etc)"
                  }
                  onChange={handleChange}
                />
                <button
                  onClick={addToMedium}
                  className="input-topics-medium__add-btn"
                >
                  <i className="fas fa-plus-square fa-2x grow2"></i>
                </button>
              </div>
              <div className="edit-photo__medium-container">
                <div className="edit-photo__medium-wrapper">
                  {mediumArr.map((t) => (
                    <div className="edit-photo__medium-item grow animate-modal">
                      <div className="edit-photo__medium-item-body">
                        <p>{`${t}`}</p>
                      </div>
                      <div className="edit-photo__medium-item-delete">
                        <i
                          className="fas fa-times"
                          title="remove"
                          onClick={() => deleteMedium(t)}
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="edit-photo__medium-warning">{warning}</p>
              </div>
            </div>

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

            <div className="edit-photo__btn-save-wrapper">
              <button className="edit-photo__btn-save">Save</button>
            </div>
          </div>
        </form>
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
    </div>
  );
};

export default EditPhoto;
