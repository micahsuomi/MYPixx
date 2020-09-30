import { combineReducers}  from 'redux';
import authReducer from './authReducer';
import photosReducer from './photosReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    photos: photosReducer,
    users: usersReducer

})