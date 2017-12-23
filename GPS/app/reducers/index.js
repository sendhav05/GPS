import { combineReducers } from 'redux';
import signIn from './signIn';
import login from './login';
import signup from './signup';

const reducers = {
  signIn,
  login,
  signup,
};

export default combineReducers(reducers);
