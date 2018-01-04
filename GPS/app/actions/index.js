import { bindActionCreators } from 'redux';
import { store } from '../store';

import { userLoginRequest,
  userSignupRequest,
  resetUserSignupData,
  fetchWareHouseRequest,
  fetchCategoryRequest,
  fetchProductRequest,
  orderPlaceRequest,
  fetchDriverWarehouseRequest }
  from './Authentication';

const actions = {
  userLoginRequest,
  userSignupRequest,
  resetUserSignupData,
  fetchWareHouseRequest,
  fetchCategoryRequest,
  fetchProductRequest,
  orderPlaceRequest,
  fetchDriverWarehouseRequest,
};

export default bindActionCreators(actions, store.dispatch);
