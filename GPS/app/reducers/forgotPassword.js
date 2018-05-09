/* eslint no-underscore-dangle: 0 */

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  forgotPasswordResponse: {},
};

function forgotPassword(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        forgotPasswordResponse: {},
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        forgotPasswordResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        forgotPasswordResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default forgotPassword;
