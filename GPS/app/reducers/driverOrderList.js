
/* eslint no-underscore-dangle: 0 */

import {
  DRIVER_ORDER_LIST_REQUEST,
  DRIVER_ORDER_LIST_SUCCESS,
  DRIVER_ORDER_LIST_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  driverOrderListResponse: {},
};

function driverOrderList(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case DRIVER_ORDER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        driverOrderListResponse: {},
      };

    case DRIVER_ORDER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driverOrderListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case DRIVER_ORDER_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        driverOrderListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default driverOrderList;
