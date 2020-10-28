import {
  GET_PHOTOS,
  AUTH_ERR,
  ADD_PHOTO,
  DELETE_PHOTO,
  GET_PHOTO,
  EDIT_PHOTO,
  LIKE_PHOTO,
} from "../actions/types";

const initialState = {
  photos: [],
  photo: {},
  isLoading: false,
  err: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        isLoading: true,
      };
    case AUTH_ERR:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    case ADD_PHOTO:
      return {
        ...state,
        photos: [action.payload, ...state.photos],
      };
    case DELETE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter((photo) => photo._id !== action.payload),
      };
    case LIKE_PHOTO:
      return {
        ...state,
        photos: [...state.photos],
      };
    case GET_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };
    case EDIT_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };
    default:
      return state;
  }
}
