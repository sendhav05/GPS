
import { loginUrl, signupUrl, wareHoueUrl, categoryListUrl,
  productListUrl, orderPlaceUrl, driverWareHouseList,
  driverOrderListUrl, reserveOrderURl, sendDriverLocationToserverURl,
  addressListUrl, addAddressListUrl, deleteAddressListUrl,
  orderPutBackUrl, cutomerPendingOrdersURl, cutomerCompleteOrdersUrl,
  notificationUrl, cancelOrderUrl, feedbackUrl,
  driverPendingOrdersURl, pickupedOrderUrl,
  completedOrderUrl, driverCompleteOrdersURl,
  uploadDocumentUrl, fetchDriverDocURl, uploadDeliveryDocumentUrl,
  uploadVehiclePhotoUrl, uploadVDriverPhotoUrl, updateProfileUrl,
  fetchProfileDataUrl, earningDataURl, updateDriverDocumentNumberUrl,
  onlineStatusUrl, driverReviewUrl, helpURl, verifyOTPUrl,
  resendOTPUrl, forgotPasswordUrl } from '../api/urls';
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

export const DRIVER_ORDER_LIST_REQUEST = 'DRIVER_ORDER_LIST_REQUEST';
export const DRIVER_ORDER_LIST_SUCCESS = 'DRIVER_ORDER_LIST_SUCCESS';
export const DRIVER_ORDER_LIST_FAILURE = 'DRIVER_ORDER_LIST_FAILURE';

export const RESERVE_ORDER_REQUEST = 'RESERVE_ORDER_REQUEST';
export const RESERVE_ORDER_SUCCESS = 'RESERVE_ORDER_SUCCESS';
export const RESERVE_ORDER_FAILURE = 'RESERVE_ORDER_FAILURE';

export const DRIVER_LOCATION_REQUEST = 'DRIVER_LOCATION_REQUEST';
export const DRIVER_LOCATION_SUCCESS = 'DRIVER_LOCATION_SUCCESS';
export const DRIVER_LOCATION_FAILURE = 'DRIVER_LOCATION_FAILURE';

export const ADDRESS_LIST_REQUEST = 'ADDRESS_LIST_REQUEST';
export const ADDRESS_LIST_SUCCESS = 'ADDRESS_LIST_SUCCESS';
export const ADDRESS_LIST_FAILURE = 'ADDRESS_LIST_FAILURE';

export const ADD_ADDRESS_LIST_REQUEST = 'ADD_ADDRESS_LIST_REQUEST';
export const ADD_ADDRESS_LIST_SUCCESS = 'ADD_ADDRESS_LIST_SUCCESS';
export const ADD_ADDRESS_LIST_FAILURE = 'ADD_ADDRESS_LIST_FAILURE';

export const DELETE_ADDRESS_LIST_REQUEST = 'DELETE_ADDRESS_LIST_REQUEST';
export const DELETE_ADDRESS_LIST_SUCCESS = 'DELETE_ADDRESS_LIST_SUCCESS';
export const DELETE_ADDRESS_LIST_FAILURE = 'DELETE_ADDRESS_LIST_FAILURE';

export const ORDER_PUT_BACK_REQUEST = 'ORDER_PUT_BACK_REQUEST';
export const ORDER_PUT_BACK_SUCCESS = 'ORDER_PUT_BACK_SUCCESS';
export const ORDER_PUT_BACK_FAILURE = 'ORDER_PUT_BACK_FAILURE';

export const CUSTOMER_COM_ORDER_REQUEST = 'CUSTOMER_COM_ORDER_REQUEST';
export const CUSTOMER_COM_ORDER_SUCCESS = 'CUSTOMER_COM_ORDER_SUCCESS';
export const CUSTOMER_COM_ORDER_FAILURE = 'CUSTOMER_COM_ORDER_FAILURE';

export const CUSTOMER_PEN_ORDER_REQUEST = 'CUSTOMER_PEN_ORDER_REQUEST';
export const CUSTOMER_PEN_ORDER_SUCCESS = 'CUSTOMER_PEN_ORDER_SUCCESS';
export const CUSTOMER_PEN_ORDER_FAILURE = 'CUSTOMER_PEN_ORDER_FAILURE';

export const NOTIFICATION_LIST_REQUEST = 'NOTIFICATION_LIST_REQUEST';
export const NOTIFICATION_LIST_SUCCESS = 'NOTIFICATION_LIST_SUCCESS';
export const NOTIFICATION_LIST_FAILURE = 'NOTIFICATION_LIST_FAILURE';

export const CANCEL_ORDER_REQUEST = 'CANCEL_ORDER_REQUEST';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER_FAILURE = 'CANCEL_ORDER_FAILURE';

export const FEEDBACK_REQUEST = 'FEEDBACK_REQUEST';
export const FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS';
export const FEEDBACK_FAILURE = 'FEEDBACK_FAILURE';

export const PICKEDUP_ORDER_REQUEST = 'PICKEDUP_ORDER_REQUEST';
export const PICKEDUP_ORDER_SUCCESS = 'PICKEDUP_ORDER_SUCCESS';
export const PICKEDUP_ORDER_FAILURE = 'PICKEDUP_ORDER_FAILURE';

export const COMPLETED_ORDER_REQUEST = 'COMPLETED_ORDER_REQUEST';
export const COMPLETED_ORDER_SUCCESS = 'COMPLETED_ORDER_SUCCESS';
export const COMPLETED_ORDER_FAILURE = 'COMPLETED_ORDER_FAILURE';

export const RESET_ADDRESS_DATA = 'RESET_ADDRESS_DATA';

export const UPLOAD_DOCUMENT_REQUEST = 'UPLOAD_DOCUMENT_REQUEST';
export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const UPLOAD_DOCUMENT_FAILURE = 'UPLOAD_DOCUMENT_FAILURE';

export const FETCH_UPLOAD_REQUEST = 'FETCH_UPLOAD_REQUEST';
export const FETCH_UPLOAD_SUCCESS = 'FETCH_UPLOAD_SUCCESS';
export const FETCH_UPLOAD_FAILURE = 'FETCH_UPLOAD_FAILURE';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const EARNING_REQUEST = 'EARNING_REQUEST';
export const EARNING_SUCCESS = 'EARNING_SUCCESS';
export const EARNING_FAILURE = 'EARNING_FAILURE';

export const UPDATE_DOCUMENT_NUM_REQUEST = 'UPDATE_DOCUMENT_NUM_REQUEST';
export const UPDATE_DOCUMENT_NUM_SUCCESS = 'UPDATE_DOCUMENT_NUM_SUCCESS';
export const UPDATE_DOCUMENT_NUM_FAILURE = 'UPDATE_DOCUMENT_NUM_FAILURE';

export const ONLLINE_STATUS_REQUEST = 'ONLLINE_STATUS_REQUEST';
export const ONLLINE_STATUS_SUCCESS = 'ONLLINE_STATUS_SUCCESS';
export const ONLLINE_STATUS_FAILURE = 'ONLLINE_STATUS_FAILURE';

export const REVIEW_REQUEST = 'REVIEW_REQUEST';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';
export const REVIEW_FAILURE = 'REVIEW_FAILURE';

export const HELP_REQUEST = 'HELP_REQUEST';
export const HELP_SUCCESS = 'HELP_SUCCESS';
export const HELP_FAILURE = 'HELP_FAILURE';

export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const RESEND_OTP_REQUEST = 'RESEND_OTP_REQUEST';
export const RESEND_OTP_SUCCESS = 'RESEND_OTP_SUCCESS';
export const RESEND_OTP_FAILURE = 'RESEND_OTP_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const userLoginRequest = (email, password, type, deviceToken, deviceType) => {
  const url = loginUrl(email, password, type, deviceToken, deviceType);
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
  totallamount, customerid, itemid, warehouseid, lat, lng, deliverytime, deliveryDistance, deliveryPayment, Itemprice,
) => {
  const url = orderPlaceUrl(
    name, contectno, email, pincode, state,
    city, address, landmark, paymentid, paymenttype, paymentstatus,
    totallamount, customerid, itemid, warehouseid, lat, lng, deliverytime, deliveryDistance, deliveryPayment, Itemprice,
  );
  console.log('********* order place', url);
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

export const driverOrderListRequest = (lat, lng, warehouseid) => {
  const url = driverOrderListUrl(lat, lng, warehouseid);
  return postApiAction({
    types: [DRIVER_ORDER_LIST_REQUEST, DRIVER_ORDER_LIST_SUCCESS, DRIVER_ORDER_LIST_FAILURE],
    url,
  });
};

export const reserveOrderRequest = (driverid, totalorder, warehouseid) => {
  const url = reserveOrderURl(driverid, totalorder, warehouseid);
  console.log('********* reserve order', url);
  return postApiAction({
    types: [RESERVE_ORDER_REQUEST, RESERVE_ORDER_SUCCESS, RESERVE_ORDER_FAILURE],
    url,
  });
};

export const sendDriverLocationToserverRequest = (reserveID, lat, lng) => {
  const url = sendDriverLocationToserverURl(reserveID, lat, lng);
  console.log('******* DRIVER LOCATION', url);

  return postApiAction({
    types: [DRIVER_LOCATION_REQUEST, DRIVER_LOCATION_SUCCESS, DRIVER_LOCATION_FAILURE],
    url,
  });
};


export const addressListRequest = (customerid) => {
  const url = addressListUrl(customerid);
  return postApiAction({
    types: [ADDRESS_LIST_REQUEST, ADDRESS_LIST_SUCCESS, ADDRESS_LIST_FAILURE],
    url,
  });
};

export const addAddressListRequest = (type, city, pincode, state, address, landmark, customerid, shippingpincode, shippingstate, shippingaddress, shippinglandmark, shippingcity) => {
  const url = addAddressListUrl(type, city, pincode, state, address, landmark, customerid, shippingpincode, shippingstate, shippingaddress, shippinglandmark, shippingcity);
  return postApiAction({
    types: [ADD_ADDRESS_LIST_REQUEST, ADD_ADDRESS_LIST_SUCCESS, ADD_ADDRESS_LIST_FAILURE],
    url,
  });
};

export const deleteAddressListRequest = (deliveryid) => {
  const url = deleteAddressListUrl('delete', deliveryid);
  return postApiAction({
    types: [DELETE_ADDRESS_LIST_REQUEST, DELETE_ADDRESS_LIST_SUCCESS, DELETE_ADDRESS_LIST_FAILURE],
    url,
  });
};

export const resetAddressData = () => ({
  type: RESET_ADDRESS_DATA,
});

export const orderPutBackRequest = (driverid, warehouseid) => {
  const url = orderPutBackUrl(driverid, warehouseid);
  return postApiAction({
    types: [ORDER_PUT_BACK_REQUEST, ORDER_PUT_BACK_SUCCESS, ORDER_PUT_BACK_FAILURE],
    url,
  });
};

export const cutomerPendingOrdersRequest = (customerid) => {
  const url = cutomerPendingOrdersURl(customerid);
  return postApiAction({
    types: [CUSTOMER_PEN_ORDER_REQUEST, CUSTOMER_PEN_ORDER_SUCCESS, CUSTOMER_PEN_ORDER_FAILURE],
    url,
  });
};

export const driverPendingOrdersRequest = (driverid) => {
  const url = driverPendingOrdersURl(driverid);
  return postApiAction({
    types: [CUSTOMER_PEN_ORDER_REQUEST, CUSTOMER_PEN_ORDER_SUCCESS, CUSTOMER_PEN_ORDER_FAILURE],
    url,
  });
};

export const cutomerCompleteOrdersRequest = (customerid) => {
  const url = cutomerCompleteOrdersUrl(customerid);
  return postApiAction({
    types: [CUSTOMER_COM_ORDER_REQUEST, CUSTOMER_COM_ORDER_SUCCESS, CUSTOMER_COM_ORDER_FAILURE],
    url,
  });
};

export const notificationListRequest = (userid) => {
  const url = notificationUrl(userid);
  return postApiAction({
    types: [NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESS, NOTIFICATION_LIST_FAILURE],
    url,
  });
};


export const cancelOrderRequest = (orderid) => {
  const url = cancelOrderUrl(orderid);
  return postApiAction({
    types: [CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE],
    url,
  });
};

export const feedbackRequest = (type, orderid, customerid, driverid, feedback, userRating) => {
  const url = feedbackUrl(type, orderid, customerid, driverid, feedback, userRating);
  return postApiAction({
    types: [FEEDBACK_REQUEST, FEEDBACK_SUCCESS, FEEDBACK_FAILURE],
    url,
  });
};

export const pickedupOrderRequest = (orderid) => {
  const url = pickupedOrderUrl(orderid);
  return postApiAction({
    types: [PICKEDUP_ORDER_REQUEST, PICKEDUP_ORDER_SUCCESS, PICKEDUP_ORDER_FAILURE],
    url,
  });
};

export const completedOrderRequest = (orderid) => {
  const url = completedOrderUrl(orderid);
  return postApiAction({
    types: [COMPLETED_ORDER_REQUEST, COMPLETED_ORDER_SUCCESS, COMPLETED_ORDER_FAILURE],
    url,
  });
};

export const driverCompleteOrdersListRequest = (driverid) => {
  const url = driverCompleteOrdersURl(driverid);
  return postApiAction({
    types: [CUSTOMER_COM_ORDER_REQUEST, CUSTOMER_COM_ORDER_SUCCESS, CUSTOMER_COM_ORDER_FAILURE],
    url,
  });
};

export const fetchDriverDocRequest = (driverid) => {
  const url = fetchDriverDocURl(driverid);
  return getApiAction({
    types: [FETCH_UPLOAD_REQUEST, FETCH_UPLOAD_SUCCESS, FETCH_UPLOAD_FAILURE],
    url,
  });
};

export const uploadDocumentRequest = (body, driverid, type, name) => {
  const url = uploadDocumentUrl(driverid, type, name);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  return postApiAction({
    types: [UPLOAD_DOCUMENT_REQUEST, UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAILURE],
    url,
    headers,
    body,
  });
};

export const uploadDeliveryDocumentRequest = (orderid, body) => {
  const url = uploadDeliveryDocumentUrl(orderid);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  return postApiAction({
    types: [UPLOAD_DOCUMENT_REQUEST, UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAILURE],
    url,
    headers,
    body,
  });
};

export const uploadVehiclePhotoRequest = (body, driverid) => {
  const url = uploadVehiclePhotoUrl(driverid);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  return postApiAction({
    types: [UPLOAD_DOCUMENT_REQUEST, UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAILURE],
    url,
    headers,
    body,
  });
};

export const fetchProfileRequest = (driverid) => {
  const url = fetchProfileDataUrl(driverid);
  return getApiAction({
    types: [FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE],
    url,
  });
};

export const uploadPhotoRequest = (body, driverid) => {
  const url = uploadVDriverPhotoUrl(driverid);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  return postApiAction({
    types: [UPLOAD_DOCUMENT_REQUEST, UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAILURE],
    url,
    headers,
    body,
  });
};

export const fetchPhotoRequest = (driverid) => {
  const url = uploadVDriverPhotoUrl(driverid);
  return getApiAction({
    types: [FETCH_UPLOAD_REQUEST, FETCH_UPLOAD_SUCCESS, FETCH_UPLOAD_FAILURE],
    url,
  });
};

export const earningDataRequest = (driverid) => {
  const url = earningDataURl(driverid);
  return getApiAction({
    types: [EARNING_REQUEST, EARNING_SUCCESS, EARNING_FAILURE],
    url,
  });
};

export const updateProfileRequest = (userid, contact, email, address, pincode, city, state, ssn) => {
  const url = updateProfileUrl(userid, contact, email, address, pincode, city, state, ssn);
  return postApiAction({
    types: [USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE],
    url,
  });
};

export const updateDriverDocumentNumberRequest = (driverid, dlnumber, ssn, address) => {
  const url = updateDriverDocumentNumberUrl(driverid, dlnumber, ssn, address);
  return getApiAction({
    types: [UPDATE_DOCUMENT_NUM_REQUEST, UPDATE_DOCUMENT_NUM_SUCCESS, UPDATE_DOCUMENT_NUM_FAILURE],
    url,
  });
};

export const onlineStatusRequest = (driverid, onlinestatus) => {
  const url = onlineStatusUrl(driverid, onlinestatus);
  return getApiAction({
    types: [ONLLINE_STATUS_REQUEST, ONLLINE_STATUS_SUCCESS, ONLLINE_STATUS_FAILURE],
    url,
  });
};

export const helpRequest = () => {
  const url = helpURl();
  return getApiAction({
    types: [HELP_REQUEST, HELP_SUCCESS, HELP_FAILURE],
    url,
  });
};


export const driverReviewRequest = (driverid) => {
  const url = driverReviewUrl(driverid);
  return getApiAction({
    types: [REVIEW_REQUEST, REVIEW_SUCCESS, REVIEW_FAILURE],
    url,
  });
};

export const verifyOTPRequest = (userid, otp) => {
  const url = verifyOTPUrl(userid, otp);
  return getApiAction({
    types: [VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE],
    url,
  });
};

export const resendOTPRequest = (emailPhone) => {
  const url = resendOTPUrl(emailPhone);
  return getApiAction({
    types: [RESEND_OTP_REQUEST, RESEND_OTP_SUCCESS, RESEND_OTP_FAILURE],
    url,
  });
};

export const forgotPasswordRequest = (emailPhone) => {
  const url = forgotPasswordUrl(emailPhone);
  return getApiAction({
    types: [FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE],
    url,
  });
};

