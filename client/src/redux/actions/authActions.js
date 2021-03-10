import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GOOGLE_LOGIN,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CLEAR_RESET_CONFIRMATION,
} from "./types";

import { 
  showErrors,
  clearErrors
 } from "./errorActions";

export const register = ({ name, email, password, repeatPassword }) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = `/api/v1/user`
      const body = JSON.stringify({ name, email, password, repeatPassword });
      const res = await axios.post(url, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch(showErrors(err.response.data, err.response.status));
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
      const url = `/api/v1/auth`
      const body = JSON.stringify({ email, password });
      const res = await axios.post(url, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const googleLogin = (response) => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/auth/google-auth`;
      axios({
        method: "POST",
        url,
        data: { tokenId: response.tokenId },
      }).then((res) => {
        console.log(res.data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
        dispatch({
          type: GOOGLE_LOGIN
        })
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      const url = `/api/v1/auth/forgot-password`;
      const res = await axios.put(url, email);
      dispatch({
        type: FORGOT_PASSWORD,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);
      // dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const resetPassword = ({
  newPassword,
  repeatNewPassword,
  resetToken,
}) => {
  return async (dispatch) => {
    try {
      const body = { newPassword, repeatNewPassword, resetToken };
      const url = `/api/v1/auth/reset-password`;
      const res = await axios.put(url, body);
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data,
      });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
    }
  };
};

export const clearResetConfirmation = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_RESET_CONFIRMATION,
    });
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
