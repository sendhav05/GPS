
/* eslint no-underscore-dangle: 0 */

import {
    ORDER_PUT_BACK_REQUEST,
    ORDER_PUT_BACK_SUCCESS,
    ORDER_PUT_BACK_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    orderPutBackResponse: {},
  };
  
  function orderPutBack(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case ORDER_PUT_BACK_REQUEST:
        return {
          ...state,
          isLoading: true,
          orderPutBackResponse: {},
        };
  
      case ORDER_PUT_BACK_SUCCESS:
        return {
          ...state,
          isLoading: false,
          orderPutBackResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case ORDER_PUT_BACK_FAILURE:
        return {
          ...state,
          isLoading: false,
          orderPutBackResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default orderPutBack;
  
  