import { bindActionCreators } from 'redux';
import { store } from '../store';

import { userLoginRequest,
  userSignupRequest,
  resetUserSignupData,
  fetchWareHouseRequest,
  fetchCategoryRequest,
  fetchProductRequest,
  orderPlaceRequest,
  fetchDriverWarehouseRequest,
  driverOrderListRequest,
  reserveOrderRequest,
  sendDriverLocationToserverRequest,
  addressListRequest,
  addAddressListRequest,
  deleteAddressListRequest,
  resetAddressData,
  orderPutBackRequest,
  cutomerPendingOrdersRequest,
  cutomerCompleteOrdersRequest,
  notificationListRequest }
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
  driverOrderListRequest,
  reserveOrderRequest,
  sendDriverLocationToserverRequest,
  addressListRequest,
  addAddressListRequest,
  deleteAddressListRequest,
  resetAddressData,
  orderPutBackRequest,
  cutomerPendingOrdersRequest,
  cutomerCompleteOrdersRequest,
  notificationListRequest,
};

export default bindActionCreators(actions, store.dispatch);
