import { $CombinedState } from "redux";
import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  comments: [],
  comment: {},
  isLoading: false,
  err: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENT:
    case EDIT_COMMENT:
      console.log("from reducer", action.payload);
      return {
        ...state,
        comment: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments,
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
}
