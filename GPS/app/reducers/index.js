import { combineReducers } from 'redux';
import signIn from './signIn';

const reducers = {
  signIn,
};

export default combineReducers(reducers);
