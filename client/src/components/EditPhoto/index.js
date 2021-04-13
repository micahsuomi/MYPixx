import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  getPhotos,
  getPhoto,
  editPhoto,
} from "../../redux/actions/photoActions";

import "../AddPhoto/style.scss";
import "./style.scss";

const EditPhoto = (props) => {
  const dispatch = useDispatch();
  const filteredPhoto = useSelector((state) => state.photos.photo);
  const [photo, setPhoto] = useState({
    photo: {
      image: "",
      title: "",
      type: "",
      technique: "",
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [warning, setWarning] = useState("");

  const { title, image, type, technique, description } = photo;

  const id = props.match.params.id;

  const [techniqueArr, setTechniqueArr] = useState([]);

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
    setTechniqueArr(filteredPhoto.technique);
    setPhoto({ ...filteredPhoto, technique: "" });
    setPhotoLoaded(true);
  }, [filteredPhoto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    photo.technique = techniqueArr;

    if (isImageChanged) {
      setPhoto({ ...photo, image: previewSource, technique: techniqueArr });
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
      image: updatedImage,
    });
  };

  const cancelImage = () => {
    setIsImageEditing(false);
    setPreviewSource(null);
    setIsImageChanged(false);
  };

  const addToTechniques = (e) => {
    e.preventDefault();

    let techniqueIndex = techniqueArr.indexOf(technique);

    if (technique.length < 1) {
      setWarning("Please enter a value");
    }
    if (techniqueIndex !== -1) {
      setWarning("Tag already present");
    } else {
      setTechniqueArr([...techniqueArr, technique]);
      setPhoto({ ...photo, technique: "" });
      setWarning("");
    }
  };

  const deleteTechnique = (t) => {
    const tecniqueIndex = techniqueArr.indexOf(t);
    techniqueArr.splice(tecniqueIndex, 1);
    setTechniqueArr([...techniqueArr]);
  };

  if (!photoLoaded) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="edit-photo">
      {photoLoaded && techniqueArr !== undefined ? (
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
                      className="edit-image__cancel grow"
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
                <option value="street">Photography</option>
                <option value="cousine">Abstract</option>
                <option value="portrait">Street Art</option>
                <option value="fashion">Digital</option>
              </select>
            </div>

            <div className="input-topics">
              <label htmlFor="technique">Tags</label>
              <div className="input-topics-technique">
                <input
                  type="text"
                  name="technique"
                  value={technique}
                  placeholder={
                    "eg(oil, acrylics, dripping, analog photography etc)"
                  }
                  onChange={handleChange}
                />
                <button
                  onClick={addToTechniques}
                  className="input-topics-technique__add-btn"
                >
                  <i className="fas fa-plus-square fa-2x"></i>
                </button>
              </div>
              <div className="edit-photo__techniques-container">
                <div className="edit-photo__techniques-wrapper">
                  {techniqueArr.map((t) => (
                    <div className="edit-photo__technique-item grow animate-modal">
                      <div className="edit-photo__technique-item-body">
                        <p>{`${t}`}</p>
                      </div>
                      <div className="edit-photo__technique-item-delete">
                        <i
                          className="fas fa-times"
                          title="remove"
                          onClick={() => deleteTechnique(t)}
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="edit-photo__technique-warning">{warning}</p>
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
              <button className="edit-photo__btn-save">Submit</button>
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
