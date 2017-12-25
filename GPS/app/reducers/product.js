/* eslint no-underscore-dangle: 0 */

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  productListResponse: {},
};

function product(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        productListResponse: {},
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case PRODUCT_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        productListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default product;

