import {
  GET_USERS,
  GET_USER,
  EDIT_USER,
  LOAD_ERR,
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  userPhotos: [],
  isUserLoaded: false,
  errorMsg: "",
  isErrShowing: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        userPhotos: action.payload.photos,
        isUserLoaded: true,
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
