
import { loginUrl, signupUrl, wareHoueUrl } from '../api/urls';
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
