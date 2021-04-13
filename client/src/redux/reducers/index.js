import { combineReducers } from "redux";
<<<<<<< HEAD
import userReducer from "./userReducer";
import photoReducer from "./photoReducer";
import commentReducer from "./commentReducer";
import errorReducer from "./errorReducer";

const createRootReducer = () => combineReducers({
  user: userReducer,
  photo: photoReducer,
  comment: commentReducer,
  error: errorReducer,
=======
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
>>>>>>> develop
});

export default createRootReducer;
