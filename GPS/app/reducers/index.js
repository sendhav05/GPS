import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import wareHouse from './wareHouse';
import category from './category';
import product from './product';
import orderPlace from './orderPlace';
import driverWareHouse from './driverWareHouse';
import driverOrderList from './driverOrderList';
import reserveOrder from './reserveOrder';
import driverLocation from './driverLocation';
import addressList from './addressList';
import orderPutBack from './orderPutBack';
import customerOrderStatus from './customerOrderStatus';
import notification from './notification';
import feedback from './feedback';
import uploadDocument from './uploadDocument';
import fetchProfile from './fetchProfile';
import earning from './earning';
import updateDocData from './updateDocData';
import onlineStatus from './onlineStatus';

const reducers = {
  login,
  signup,
  wareHouse,
  category,
  product,
  orderPlace,
  driverWareHouse,
  driverOrderList,
  reserveOrder,
  driverLocation,
  addressList,
  orderPutBack,
  customerOrderStatus,
  notification,
  feedback,
  uploadDocument,
  fetchProfile,
  earning,
  updateDocData,
  onlineStatus,
};

export default combineReducers(reducers);
