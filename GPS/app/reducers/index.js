import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import wareHouse from './wareHouse';
import category from './category';

const reducers = {
  login,
  signup,
  wareHouse,
  category,
};

export default combineReducers(reducers);
