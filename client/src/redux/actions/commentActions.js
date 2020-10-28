import axios from "axios";

import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "./types";

import { tokenConfig } from "./authActions";

export const getComments = (id) => {
  console.log('id is here', id)
  return async (dispatch) => {
    try {
      const url = `/api/v1/photos/${id}/comments`;
      const res = await axios.get(url);

      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getComment = (photoId, commentId) => {
  return async (dispatch) => {
    try {
      console.log("photo id", photoId, "comment id", commentId);
      const url = `/api/v1/photos/${photoId}/comments`;
      const res = await axios.get(url);

      const foundComment = res.data.find((comment) => {
        return comment._id === commentId;
      });
      dispatch({
        type: GET_COMMENT,
        payload: foundComment,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const addComment = (photoId, newComment) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${photoId}/comments`;
      const res = await axios.post(url, newComment, tokenConfig(getState));
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const editComment = (photoId, commentId, updatedComment) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${photoId}/comments/${commentId}`;
      const res = await axios.put(url, updatedComment, tokenConfig(getState));
      dispatch({
        type: EDIT_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const deleteComment = (photoId, commentId) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${photoId}/comments/${commentId}`;
      const res = await axios.delete(url, tokenConfig(getState));
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
};
