import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { addPhoto } from "../../redux/actions/photoActions";
import "./style.css";

const AddPhoto = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState({
    image: "",
    previewSource: null,
    fileInput: null,
    selectedFile: null,
  });

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
      name: text.name,
      image: image.image,
      description: text.description,
    };

    console.log(newPhoto);
    dispatch(addPhoto(newPhoto));
    props.history.push("/photos");
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

  return (
    <div className="add-photo__container">
      <form onSubmit={handleSubmit} className="add-photo__form animate-modal">
        <div className="cancel-wrapper">
          <NavLink to="/photos" className="delete-link">
            <i className="fas fa-times-circle fa-2x grow"></i>
          </NavLink>
        </div>
        <h2>Add a new photo</h2>

        <div className="input-topics">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={text.name}
            placeholder="photo name"
            onChange={handleChange}
          />
        </div>

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
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={text.description}
            placeholder="description"
            onChange={handleChange}
          />
        </div>

        <div className="btn-save__wrapper">
          <button className="btn-save">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPhoto;
