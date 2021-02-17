import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { addPhoto } from "../../redux/actions/photoActions";
import { getUsers } from "../../redux/actions/userActions";

import "./style.scss";

const AddPhoto = ({ history }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [text, setText] = useState({
    title: "",
    type: "",
    medium: "",
    description: "",
  });

  const { title, type, medium, description } = text;

  const [image, setImage] = useState({
    image: "",
    previewSource: null,
    fileInput: null,
    selectedFile: null,
  });
  const [mediumArr, setMediumArr] = useState([]);
  const [isMediumDup, setIsMediumDup] = useState(false)
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
     history.push("/login");
    }
  }, [isAuthenticated, history]);

  const fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    setImage({
      image: file,
      fileInput: e.target.value,
    });
    filePreview(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPhoto = {
      title: title,
      image: image.previewSource,
      type: type,
      medium: mediumArr,
      description: description,
    };

    dispatch(addPhoto(newPhoto));
    setTimeout(() => {
      dispatch(getUsers());
      history.push("/photos");
    }, 2000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  const filePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage({
        previewSource: reader.result,
        image: reader.result,
      });
    };
  };

  const addToTechniques = (e) => {
    e.preventDefault();
    const mediumIndex = mediumArr.indexOf(medium);
    console.log(medium.length)
    if (medium.length < 1) {
      setWarning("Please enter a value");
    } else
    if (mediumIndex !== -1) {
      setWarning("Tag already present");
      prompt('tag already present')
      setIsMediumDup(true);
    } else {
      setMediumArr([...mediumArr, medium]);
      setText({ ...text, medium: "" });
      console.log(mediumArr);
      setWarning("");
      setIsMediumDup(false);
    }
  };

  const deleteMedium = (t) => {
    const mediumIndex = mediumArr.indexOf(t);
    mediumArr.splice(mediumIndex, 1);
    setMediumArr([...mediumArr]);
  };

  return (
    <div className="add-photo">
      <form onSubmit={handleSubmit} className="add-photo__form animate-modal">
        <div className="add-photo__cancel-wrapper">
          <NavLink to="/photos" className="delete-link">
            <i className="fas fa-times-circle fa-2x grow"></i>
          </NavLink>
        </div>

        <h2>Add gallery item</h2>
        <div className="input-topics">
          <label htmlFor="image">Image </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            required
            onChange={fileSelectedHandler}
          />
        </div>

        {image.previewSource && (
          <img
            src={image.previewSource}
            alt="chosen"
            style={{ height: "200px" }}
          />
        )}
        <div className="input-topics">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="input-topics">
          <label htmlFor="type">Type</label>
          <select name="type" value={type} onChange={handleChange}>
            <option value="">---select type</option>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
            <option value="photography">Photography</option>
            <option value="abstract">Abstract</option>
            <option value="street art">Street Art</option>
            <option value="digital">Digital</option>
          </select>
        </div>

        <div className="input-topics">
          <label htmlFor="technique">Tags</label>
          <div className="input-topics-technique">
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
              onClick={addToTechniques}
              className="input-topics-technique__add-btn"
            >
              <i className="fas fa-plus-square fa-2x"></i>
            </button>
          </div>
          <div className="add-photo__techniques-wrapper">
            {mediumArr.map((m) => (
              <div className="add-photo__technique-item grow">
                <div className="add-photo__technique-item-header">
                  <i
                    className="fas fa-times"
                    title="remove"
                    onClick={() => deleteMedium(m)}
                  ></i>
                </div>
                <div className="add-photo__technique-item-body">
                  <p>{`${m}`}</p>
                </div>
              </div>
            ))}
          </div>
          {medium.length < 1 || medium !== '' || isMediumDup && warning}
        </div>

        <div className="input-topics">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="description"
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="add-photo__btn-save-wrapper">
          <button className="add-photo__btn-save">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPhoto;

AddPhoto.propTypes = {
  history: PropTypes.object,
};
