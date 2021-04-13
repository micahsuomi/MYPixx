import { SHOW_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: "",
  status: null,
};

export default function error(state = initialState, action) {
  switch (action.type) {
    case SHOW_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        msg: "",
        status: null,
      };
    default:
      return state;
  }
}
