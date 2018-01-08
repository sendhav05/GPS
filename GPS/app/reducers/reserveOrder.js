
/* eslint no-underscore-dangle: 0 */

import {
  RESERVE_ORDER_REQUEST,
  RESERVE_ORDER_SUCCESS,
  RESERVE_ORDER_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  reserveOrderResponse: {},
};

function reserveOrder(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case RESERVE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        reserveOrderResponse: {},
      };

    case RESERVE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reserveOrderResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case RESERVE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        reserveOrderResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default reserveOrder;

