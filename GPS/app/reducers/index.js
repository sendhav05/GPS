import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import wareHouse from './wareHouse';
import category from './category';
import product from './product';

const reducers = {
  login,
  signup,
  wareHouse,
  category,
  product,
};

export default combineReducers(reducers);
