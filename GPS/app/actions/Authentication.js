
import { loginUrl, signupUrl, wareHoueUrl, categoryListUrl,
  productListUrl, orderPlaceUrl, driverWareHouseList } from '../api/urls';
import { postApiAction, getApiAction } from '../api/actions/apiActions';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const RESET_USER_SIGNUP_DATA = 'USER_SIGNUP_FAILURE';

export const WARE_HOUSE_REQUEST = 'WARE_HOUSE_REQUEST';
export const WARE_HOUSE_SUCCESS = 'WARE_HOUSE_SUCCESS';
export const WARE_HOUSE_FAILURE = 'WARE_HOUSE_FAILURE';

export const CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST';
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
export const CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE';

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE';

export const ORDER_PLACE_REQUEST = 'ORDER_PLACE_REQUEST';
export const ORDER_PLACE_SUCCESS = 'ORDER_PLACE_SUCCESS';
export const ORDER_PLACE_FAILURE = 'ORDER_PLACE_FAILURE';

export const DRIVER_WARE_HOUSE_REQUEST = 'DRIVER_WARE_HOUSE_REQUEST';
export const DRIVER_WARE_HOUSE_SUCCESS = 'DRIVER_WARE_HOUSE_SUCCESS';
export const DRIVER_WARE_HOUSE_FAILURE = 'DRIVER_WARE_HOUSE_FAILURE';

export const userLoginRequest = (email, password, type) => {
  const url = loginUrl(email, password, type);
  return postApiAction({
    types: [USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    url,
  });
};

export const userSignupRequest = (email, password, type, phone, name) => {
  const url = signupUrl(email, password, type, phone, name);
  return postApiAction({
    types: [USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE],
    url,
  });
};

export const resetUserSignupData = () => ({
  type: RESET_USER_SIGNUP_DATA,
});

export const fetchWareHouseRequest = () => {
  return postApiAction({
    types: [WARE_HOUSE_REQUEST, WARE_HOUSE_SUCCESS, WARE_HOUSE_FAILURE],
    url: wareHoueUrl,
  });
};

export const fetchCategoryRequest = (id) => {
  const url = categoryListUrl(id);
  return postApiAction({
    types: [CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILURE],
    url,
  });
};

export const fetchProductRequest = (id) => {
  const url = productListUrl(id);
  return postApiAction({
    types: [PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE],
    url,
  });
};

export const orderPlaceRequest = (
  name, contectno, email, pincode, state,
  city, address, landmark, paymentid, paymenttype, paymentstatus,
  totallamount, customerid, itemid, warehouseid,
) => {
  const url = orderPlaceUrl(
    name, contectno, email, pincode, state,
    city, address, landmark, paymentid, paymenttype, paymentstatus,
    totallamount, customerid, itemid, warehouseid,
  );
  console.log('*******', url);
  return postApiAction({
    types: [ORDER_PLACE_REQUEST, ORDER_PLACE_SUCCESS, ORDER_PLACE_FAILURE],
    url,
  });
};

export const fetchDriverWarehouseRequest = (lat, lng) => {
  const url = driverWareHouseList(lat, lng);
  return postApiAction({
    types: [DRIVER_WARE_HOUSE_REQUEST, DRIVER_WARE_HOUSE_SUCCESS, DRIVER_WARE_HOUSE_FAILURE],
    url,
  });
};
