import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import exerciseReducer from './exerciseSlice';
import userReducer from './userSlice';

const reducer = combineReducers({
  exercises: exerciseReducer,
  user: userReducer,
});

export default configureStore({
  reducer,
  devTools: true
});
