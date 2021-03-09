import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUsers, getUser, updateUser } from "../../redux/actions/userActions";
import { getPhotos } from "../../redux/actions/photoActions";

import "./style.scss";

const EditUser = (props) => {
  const [user, setUser] = useState({
    user: {
      name: "",
      email: "",
      avatar: "",
      medium: "",
      bio: "",
    },
  });
  const dispatch = useDispatch();
  const loadedEditUser = useSelector((state) => state.user.user);
  // const [err, loadedUser] = useUser();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isGoogleUser = useSelector((state) => state.user.isGoogleUser);
  console.log(isGoogleUser)
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const [selectedFile] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [mediumArr, setMediumArr] = useState([]);
  const [warning, setWarning] = useState("");

  const id = props.match.params.id;

  const handleSubmit = (e) => {
    console.log('calling', user)
    e.preventDefault();
    user.medium = mediumArr;
    if (isImageChanged) {
      setUser(previewSource);
    }
    dispatch(updateUser(id, user));    
    setTimeout(() => {
      props.history.push(`/user/${id}`);
      props.openUserPopup();
      setTimeout(() => {
        dispatch(getUsers());
        dispatch(getUser(id));
        dispatch(getPhotos())
      }, 2000);
    }, 2000);
  };

  const loadUser = async () => {
    try {
      setMediumArr(loadedEditUser.medium);
      setUser({ ...loadedEditUser, medium: '' });
    }
    catch(err) {
      return 'something went wrong'
    }
  }

  const fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    setUpdatedImage(file);
    setUpdatedImage(file);
    setFileInput(e.target.value);
    filePreview(file);
  };

  const filePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      setPreviewSource(result);
      setIsImageChanged(true);
      setUser({ ...user, avatar: result });
    };
  };

  const openImageEditing = () => {
    setIsImageEditing(true);
    setUser({ ...user, medium: mediumArr });
  };

  const cancelImage = () => {
    setIsImageEditing(false);
    setPreviewSource(null);
    setIsImageChanged(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login")
    } else {
      loadUser();
    }
  }, [isAuthenticated, props.history]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const addToMedium = (e) => {
    e.preventDefault();
    const mediumIndex = mediumArr.indexOf(medium);
    if (medium.length < 1) {
      setWarning("Please enter a value");
    }
    if (mediumIndex !== -1) {
      setWarning("Tag already present");
    } else {
      setMediumArr([...mediumArr, medium]);
      setUser({ ...user, medium: "" });
      setWarning("");
    }
  };

  const deleteMedium = (m) => {
    const mediumIndex = mediumArr.indexOf(m);
    mediumArr.splice(mediumIndex, 1);
    setMediumArr([...mediumArr]);
  };

  let { name, email, avatar, medium, bio } = user;
  if (avatar === undefined || avatar === "") {
    avatar =
      "https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";
  }

  return (

    <div className="edit-user">
      <form onSubmit={handleSubmit} className="edit-user__form animate-modal">
        <div className="edit-user__cancel-wrapper">
          <NavLink to={`/user/${id}`} className="delete-link">
          <i className="fas fa-times-circle fa-2x"></i>
          </NavLink>
        </div>
        <h2>Edit User Profile</h2>
        <p className="warning-msg">{props.msg}</p>
        <div className="input-topics">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Full Name"
            onChange={handleChange}
            disabled={isGoogleUser ? true : false}
          />
        </div>

        <div className="input-topics">
          <label htmlFor="image">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={handleChange}
            disabled={isGoogleUser ? true : false}
          />
        </div>
        {/* {!isImageChanged ? ( */}
          <div className="input-topics">
            <label htmlFor="image" className="edit-user__image-label">
              Image
            </label>
            <input
              type="text"
              name="avatar"
              value={avatar}
              placeholder="insert image link here"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div className="edit-user__preview-image">
              <img
                src={avatar}
                alt="curent user profile"
                style={{ height: "200px" }}
              />
            </div>
          </div>

        {!isImageEditing && !isGoogleUser ? (
          <button
            onClick={openImageEditing}
            className="edit-user__change-photo grow"
          >
            Change
          </button>
        ) : null}
        {isImageEditing || isImageChanged ? (
          <div>
            <div className="input-topics">
              <label htmlFor="image" className="image-label">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                required
                onChange={fileSelectedHandler}
              />
            </div>
            {previewSource && (
              <div className="edit-user__preview-image">
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "200px" }}
                />
                <button
                  className="edit-user__remove-photo grow"
                  onClick={cancelImage}
                >
                  Remove
                </button>
              </div>
            )}{" "}
            {!isImageChanged ? (
              <div className="buttons-wrapper">
                <button
                  className="edit-user__cancel-photo grow"
                  onClick={cancelImage}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="input-topics">
          <label htmlFor="medium">Medium</label>
          <div className="input-topics-medium">
            <input
              type="text"
              name="medium"
              value={medium}
              placeholder={
                "painting, photography, street art... etc)"
              }
              onChange={handleChange}
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            />
            <button
              onClick={addToMedium}
              className="input-topics-medium__add-btn"
            >
              <i className="fas fa-plus-square fa-2x"></i>
            </button>
          </div>
          <div className="edit-user__mediums-container">
            <div className="edit-user__mediums-wrapper">
              {mediumArr.length > 0 && mediumArr.map((m) => (
                <div className="edit-user__medium-item grow animate-modal">
                  <div className="edit-user__medium-item-body">
                    <p key={m}>{`${m}`}</p>
                  </div>
                  <div className="edit-user__medium-item-delete">
                    <i
                      className="fas fa-times"
                      title="remove"
                      onClick={() => deleteMedium(m)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
            <p className="edit-user__medium-warning">{warning}</p>
          </div>
        </div>

        <div className="input-topics">
          <label htmlFor="description">Bio</label>
          <textarea
            type="text"
            name="bio"
            value={bio}
            placeholder="bio"
            onChange={handleChange}
          />
        </div>
        <div className="edit-user__btn-save-wrapper">
          <button className="edit-user__btn-save">Update</button>
        </div>
      </form> 
    </div>
  );
};

export default EditUser;
