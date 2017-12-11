import { combineReducers } from 'redux';
import signIn from './signIn';
import login from './login';

const reducers = {
  signIn,
  login,
};

export default combineReducers(reducers);
