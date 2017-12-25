import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';

const reducers = {
  login,
  signup,
};

export default combineReducers(reducers);
