import { combineReducers } from "redux";
import userReducer from "./userReducer";
import photoReducer from "./photoReducer";
import commentReducer from "./commentReducer";
import errorReducer from "./errorReducer";

const createRootReducer = () => combineReducers({
  user: userReducer,
  photo: photoReducer,
  comment: commentReducer,
  error: errorReducer,
});

export default createRootReducer;
