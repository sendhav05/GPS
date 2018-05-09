/* eslint no-underscore-dangle: 0 */

import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  verifyOTPResponse: {},
  resendOTPResponse: {},
};

function verifyOTP(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        verifyOTPResponse: {},
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        verifyOTPResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        verifyOTPResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

      // Resend OTP
    case RESEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        resendOTPResponse: {},
      };

    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resendOTPResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case RESEND_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        resendOTPResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default verifyOTP;

