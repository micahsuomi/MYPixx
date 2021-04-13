import axios from "axios";

import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  ADD_COMMENT_REPLY,
} from "./types";

import { tokenConfig } from "./authActions";
import { showErrors } from "./errorActions";

export const getComments = (id) => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/photos/${id}`;
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
  // console.log('from get comment action', photoId, commentId)
  return async (dispatch) => {
    try {
      const url = `/api/v1/photos/${photoId}/comments/${commentId}`;
      const res = await axios.get(url);
      dispatch({
        type: GET_COMMENT,
        payload: res.data,
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

export const likeComment = (photoId, commentId, likedComment) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${photoId}/comments/${commentId}/like`;
      const res = await axios.post(url, likedComment, tokenConfig(getState));
      dispatch({
        type: LIKE_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const addCommentReply = (photoId, commentId, commentReply) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/photos/${photoId}/comments/${commentId}`;
      const res = await axios.post(url, commentReply, tokenConfig(getState));
      console.log("from actions", res);
      dispatch({
        type: ADD_COMMENT_REPLY,
        payload: res.data,
      });
    } catch (err) {}
  };
};
