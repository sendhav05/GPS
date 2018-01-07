import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import wareHouse from './wareHouse';
import category from './category';
import product from './product';
import orderPlace from './orderPlace';
import driverWareHouse from './driverWareHouse';
import driverOrderList from './driverOrderList';

const reducers = {
  login,
  signup,
  wareHouse,
  category,
  product,
  orderPlace,
  driverWareHouse,
  driverOrderList,
};

export default combineReducers(reducers);
