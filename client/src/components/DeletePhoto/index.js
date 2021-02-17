import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { deletePhoto } from "../../redux/actions/photoActions";
import { getUsers } from "../../redux/actions/userActions";

import "./style.scss";

const DeletePhoto = ({ id, history }) => {
  const dispatch = useDispatch();

  const deleteOnClick = () => {
    dispatch(deletePhoto(id));
    setTimeout(() => {
      history.push("/photos");
      dispatch(getUsers());
    }, 1000);
  };

  return (
    <div className="delete-photo animate-modal">
      <div className="delete-photo__wrapper">
        <div className="delete-photo__cancel-wrapper">
          <NavLink to={`/photos/${id}`} className="delete-link">
            <i className="fas fa-times-circle fa-2x"></i>
          </NavLink>
        </div>
        <h3 className="delete-photo__warning">
          Are you sure you want to delete this photo?
        </h3>
        <div className="delete-photo__btn-wrapper">
          <button className="delete-photo__delete-btn" onClick={deleteOnClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePhoto;

DeletePhoto.propTypes = {
  id: PropTypes.string,
  history: PropTypes.object,
};
