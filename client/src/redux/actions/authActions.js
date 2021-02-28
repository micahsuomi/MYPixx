import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from "./types";

import { showErrors } from "./errorActions";

const proxyUrl = 'http://localhost:5000'

export const register = ({ name, email, password, repeatPassword }) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ name, email, password, repeatPassword });
      const res = await axios.post(`${proxyUrl}/api/v1/user`, body, config);
      console.log(res)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
      console.log(err);
      // dispatch(showErrors(err.res.data, err.res.status));
    }
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post(`api/v1/auth`, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: LOGIN_FAIL,
      });
      
      // dispatch(showErrors(err.res.data, err.res.status));
    } 
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  const token = getState().user.token;
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
