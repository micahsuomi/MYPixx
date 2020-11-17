import { combineReducers } from "redux";
import authReducer from "./authReducer";
import photosReducer from "./photosReducer";
import commentsReducer from "./commentsReducer";
import usersReducer from "./usersReducer";
import errorsReducer from "./errorReducer";

const createRootReducer = () => combineReducers({
  auth: authReducer,
  photos: photosReducer,
  comments: commentsReducer,
  users: usersReducer,
  errors: errorsReducer,
});

export default createRootReducer;
