import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import wareHouse from './wareHouse';

const reducers = {
  login,
  signup,
  wareHouse,
};

export default combineReducers(reducers);
