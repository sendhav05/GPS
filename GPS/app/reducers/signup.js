/* eslint no-underscore-dangle: 0 */

import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  RESET_USER_SIGNUP_DATA,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  userSignupResponse: {},
};

function signup(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        userSignupResponse: {},
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userSignupResponse: {
          response: action.data._bodyInit ? JSON.parse(action.data._bodyInit) : '',
          status: action.data.status,
        },
      };

    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        userSignupResponse: {
          response: action.data._bodyInit ? JSON.parse(action.data._bodyInit) : '',
          status: action.data.status,
        },
      };

    case RESET_USER_SIGNUP_DATA:
      return {
        ...state,
        isLoading: false,
        userSignupResponse: {},
      };

    default:
      return state;
  }
}

export default signup;
