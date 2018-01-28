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
  notificationListRequest,
  cancelOrderRequest,
  feedbackRequest }
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
  cancelOrderRequest,
  feedbackRequest,
};

export default bindActionCreators(actions, store.dispatch);
