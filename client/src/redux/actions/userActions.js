import { GET_USERS, GET_USER, EDIT_USER } from "./types";

import axios from "axios";
import { tokenConfig } from "./authActions";
import { showErrors } from "./errorActions";

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/user`;
      const res = await axios.get(url);
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err)
      // dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/user/${userId}`;
      const res = await axios.get(url);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err)
      // dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const updateUser = (id, user) => {
  return async (dispatch, getState) => {
    try {
      const url = `/api/v1/user/${id}`;
      const res = await axios.put(url, user, tokenConfig(getState));
      dispatch({
        type: EDIT_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err)
      // dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};
