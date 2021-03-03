import {
  GET_PHOTOS,
  ADD_PHOTO,
  DELETE_PHOTO,
  GET_PHOTO,
  EDIT_PHOTO,
  LIKE_PHOTO,
  GET_PHOTO_LIKES,
} from "../actions/types";

const initialState = {
  photos: [],
  photo: {},
  likes: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        isLoading: true,
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
    case EDIT_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };
    case GET_PHOTO_LIKES:
      const { likes } = action.payload;
      return {
        ...state,
        likes: likes,
      };
    default:
      return state;
  }
}
