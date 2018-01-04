import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import wareHouse from './wareHouse';
import category from './category';
import product from './product';
import orderPlace from './orderPlace';
import driverWareHouse from './driverWareHouse';

const reducers = {
  login,
  signup,
  wareHouse,
  category,
  product,
  orderPlace,
  driverWareHouse,
};

export default combineReducers(reducers);
