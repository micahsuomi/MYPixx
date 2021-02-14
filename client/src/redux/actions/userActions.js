import { GET_USERS, GET_USER, EDIT_USER, LOAD_ERR } from "./types";

import axios from "axios";
import { tokenConfig } from "./authActions";

export const getUsers = () => (dispatch) => {
  axios
    .get(`http://localhost:5000/api/v1/user`)
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_ERR,
        payload: err.response,
      })
    );
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:5000/api/v1/user/${userId}`;
      const res = await axios.get(url);
      console.log("calling from actions", res.data);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_ERR,
        payload: err.response,
      });
    }
  };
};

export const updateUser = (id, user) => {
  return async (dispatch, getState) => {
    try {
      const url = `http://localhost:5000/api/v1/user/${id}`;
      console.log("from actions", user);
      const res = await axios.put(url, user, tokenConfig(getState));
      console.log("response here", res);
      dispatch({
        type: EDIT_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_ERR,
        payload: err.response,
      });
    }
  };
};
