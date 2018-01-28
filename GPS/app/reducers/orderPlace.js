/* eslint no-underscore-dangle: 0 */

import {
  ORDER_PLACE_REQUEST,
  ORDER_PLACE_SUCCESS,
  ORDER_PLACE_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  orderPlaceResponse: {},
  cancelOrderResponse: {},
};

function orderPlace(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case ORDER_PLACE_REQUEST:
      return {
        ...state,
        isLoading: true,
        orderPlaceResponse: {},
      };

    case ORDER_PLACE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderPlaceResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case ORDER_PLACE_FAILURE:
      return {
        ...state,
        isLoading: false,
        orderPlaceResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        cancelOrderResponse: {},
      };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cancelOrderResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case CANCEL_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        cancelOrderResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default orderPlace;

