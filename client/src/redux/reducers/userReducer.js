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
  CLEAR_ALLVALIDATIONS,
  GET_USERS,
  GET_USER,
  EDIT_USER,
  LOAD_ERR,
} from "../actions/types";

const initialState = {
  token: null,
  isValidated: false,
  isAuthenticated: false,
  isGoogleUser: false,
  forgotPasswordConfirmation: "",
  isLoading: false,
  user: {},
  errorMsg: "",
  users: [],
  isUserLoaded: false,
  isErrShowing: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isValidated: true,
        errorMsg: "",
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      const { user, token } = action.payload;
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: true,
        user: user,
        token: token,
      };
    case GOOGLE_LOGIN:
      return {
        ...state,
        isGoogleUser: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isGoogleUser: false,
      };
    case FORGOT_PASSWORD:
    case RESET_PASSWORD:
      const { msg } = action.payload;
      return {
        ...state,
        forgotPasswordConfirmation: msg,
      };
    case CLEAR_RESET_CONFIRMATION:
      return {
        ...state,
        forgotPasswordConfirmation: "",
      };
    case CLEAR_ALLVALIDATIONS:
      return {
        ...state,
        isValidated: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOAD_ERR:
      return {
        ...state,
        errorMsg: action.payload,
        isErrorShowing: true,
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
