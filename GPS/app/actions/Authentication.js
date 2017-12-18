
import { loginUrl } from '../api/urls';
import { postApiAction, getApiAction } from '../api/actions/apiActions';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const userLoginRequest = (email, password, type) => {
  const url = loginUrl(email, password, type);
  console.log('****** url',url);
  return postApiAction({
    types: [USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    url,
  });
};
