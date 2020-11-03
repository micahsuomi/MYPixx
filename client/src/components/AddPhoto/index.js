import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { addPhoto } from "../../redux/actions/photoActions";
import { getUsers } from "../../redux/actions/userActions";

import "./style.scss";

const AddPhoto = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [text, setText] = useState({
    title: "",
    type: "",
    technique: "",
    description: "",
  });

  const { title, type, technique, description } = text;

  const [image, setImage] = useState({
    image: "",
    previewSource: null,
    fileInput: null,
    selectedFile: null,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
  }, []);

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
      title,
      image: image.previewSource,
      type,
      technique,
      description,
    };

    dispatch(addPhoto(newPhoto));
    setTimeout(() => {
      dispatch(getUsers());
      props.history.push("/photos");
    }, 2000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
    console.log(value);
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
          />
        </div>

        <div className="input-topics">
          <label htmlFor="type">Type</label>
          <select name="type" value={type} onChange={handleChange}>
            <option value="">---select type</option>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
            <option value="street">Photography</option>
            <option value="cousine">Abstract</option>
            <option value="portrait">Street Art</option>
            <option value="fashion">Digital</option>
          </select>
        </div>

        <div className="input-topics">
          <label htmlFor="technique">Technique</label>
          <input
            type="text"
            name="technique"
            value={technique}
            placeholder="tecnique"
            onChange={handleChange}
          />
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

        <div className="add-photo__btn-save-wrapper">
          <button className="add-photo__btn-save">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPhoto;
