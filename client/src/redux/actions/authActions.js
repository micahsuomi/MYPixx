import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADING,
  USER_LOADED,
  LOGOUT_SUCCESS,
  AUTH_ERR,
} from "./types";

export const register = ({ name, email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  axios
    .post("/api/v1/user", body, config)
    .then((response) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    );
};

export const login = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("/api/v1/auth", body, config)
    .then((response) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    );
};

export const loadUser = () => (dispatch, getState) => {
  console.log("loading user");
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get("/api/v1/login/user", tokenConfig(getState))
    .then((response) =>
      dispatch({
        type: USER_LOADED,
        payload: response.data,
        // console.log('response from loadUser', response.data)
      })
    )
    .catch((err) =>
      dispatch({
        type: AUTH_ERR,
        payload: err.response.data,
      })
    );
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
    console.log("I am calling token config here setting headers", token);
  }
  return config;
};
