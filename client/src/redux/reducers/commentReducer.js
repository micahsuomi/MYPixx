import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  ADD_COMMENT_REPLY
} from "../actions/types";

const initialState = {
  comments: [],
  comment: {},
  isCommentLiked: false,
  isLoading: false,
  err: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      const { comments } = action.payload;
      console.log('from reducer', comments)
      return {
        ...state,
        comments: comments,
      };
    case GET_COMMENT:
    case EDIT_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case ADD_COMMENT:
    case ADD_COMMENT_REPLY:
      return {
        ...state,
        comments: state.comments,
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    case LIKE_COMMENT:
      console.log("from reducer likes", action.payload);
      return {
        ...state,
        comments: [...state.comments],
        comment: action.payload,
      };
    default:
      return state;
  }
}
