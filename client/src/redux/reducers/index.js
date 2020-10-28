import { combineReducers } from "redux";
import authReducer from "./authReducer";
import photosReducer from "./photosReducer";
import commentsReducer from "./commentsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  photos: photosReducer,
  comments: commentsReducer,
  users: usersReducer,
});
