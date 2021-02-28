import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_ALLVALIDATIONS,
} from "../actions/types";

const initialState = {
  token: null,
  isValidated: false,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  errorMsg: "",
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
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: true,
        errorMsg: "",
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
      };
    case CLEAR_ALLVALIDATIONS:
      return {
        ...state,
        isValidated: false,
      };

    default:
      return state;
  }
}
