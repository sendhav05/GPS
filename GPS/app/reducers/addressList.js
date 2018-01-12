/* eslint no-underscore-dangle: 0 */

import {
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  addressListResponse: {},
};

function addressList(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case ADDRESS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        addressListResponse: {},
      };

    case ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addressListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case ADDRESS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        addressListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default addressList;
