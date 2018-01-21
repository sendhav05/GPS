
/* eslint no-underscore-dangle: 0 */

import {
    CUSTOMER_PEN_ORDER_REQUEST,
    CUSTOMER_PEN_ORDER_SUCCESS,
    CUSTOMER_PEN_ORDER_FAILURE,
    CUSTOMER_COM_ORDER_REQUEST,
    CUSTOMER_COM_ORDER_SUCCESS,
    CUSTOMER_COM_ORDER_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    customerPendingOrdersResponse: {},
    customerCompleteOrdersResponse: {},
  };
  
  function customerOrderStatus(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case CUSTOMER_PEN_ORDER_REQUEST:
        return {
          ...state,
          isLoading: true,
          customerPendingOrdersResponse: {},
        };
  
      case CUSTOMER_PEN_ORDER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          customerPendingOrdersResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case CUSTOMER_PEN_ORDER_FAILURE:
        return {
          ...state,
          isLoading: false,
          customerPendingOrdersResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };

      case CUSTOMER_COM_ORDER_REQUEST:
        return {
          ...state,
          isLoading: true,
          customerCompleteOrdersResponse: {},
        };
  
      case CUSTOMER_COM_ORDER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          customerCompleteOrdersResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case CUSTOMER_COM_ORDER_FAILURE:
        return {
          ...state,
          isLoading: false,
          customerCompleteOrdersResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };

        
  
      default:
        return state;
    }
  }
  
  export default customerOrderStatus;
  