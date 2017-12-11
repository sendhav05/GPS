/* eslint no-underscore-dangle: 0 */

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  userLoginResponse: {},
};

function login(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        userLoginResponse: {},
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userLoginResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        userLoginResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default login;
