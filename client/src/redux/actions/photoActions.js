import axios from "axios";
import {
  GET_PHOTOS,
  ADD_PHOTO,
  DELETE_PHOTO,
  GET_PHOTO,
  EDIT_PHOTO,
  LIKE_PHOTO,
  GET_PHOTO_LIKES,
} from "./types";

import { tokenConfig } from "./authActions";
import { showErrors } from "./errorActions";

const proxyUrl = 'http://localhost:5000'

export const getPhotos = () => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/photos`;
      const res = await axios.get(url);
      dispatch({
        type: GET_PHOTOS,
        payload: res.data,
      });
    } catch (err) {
      // dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const addPhoto = (newPhoto) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos`;
      console.log("new photo before req", newPhoto);

      const res = await axios.post(url, newPhoto, tokenConfig(getState));
      console.log(res)
      dispatch({
        type: ADD_PHOTO,
        payload: res.data,
      });
    } catch (err) {
      console.log(err)
      // dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const getPhoto = (id) => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/photos/${id}`;
      const res = await axios.get(url);
      dispatch({
        type: GET_PHOTO,
        payload: res.data 
      });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const editPhoto = (id, photo) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${id}`;
      const res = await axios.put(url, photo, tokenConfig(getState));
      dispatch({
        type: EDIT_PHOTO,
        payload: res.data,
      });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const deletePhoto = (id) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${id}`;
      const res = await axios.delete(url, tokenConfig(getState));
      dispatch({
        type: DELETE_PHOTO,
        payload: id,
      });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const likePhoto = (likedPhoto, id) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${id}/like`;
      const res = await axios.post(url, likedPhoto, tokenConfig(getState));
      dispatch({ type: LIKE_PHOTO, payload: res.data });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const getPhotoLikes = (id) => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/photos/${id}`;
      const res = await axios.get(url);
      dispatch({ type: GET_PHOTO_LIKES, payload: res.data });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};


