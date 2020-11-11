import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTLIKES,
  LIKE_COMMENT,
} from "../actions/types";

const initialState = {
  comments: [],
  comment: {},
  commentLikes: [],
  isCommentLiked: false,
  isLoading: false,
  err: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      const { comments } = action.payload;
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
    case GET_COMMENTLIKES:
      return {
        ...state,
        commentLikes: action.payload,
      };

    default:
      return state;
  }
}
