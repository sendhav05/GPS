/* eslint no-underscore-dangle: 0 */

import {
    EARNING_REQUEST,
    EARNING_SUCCESS,
    EARNING_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    earingResponse: {},
  };
  
  function earning(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case EARNING_REQUEST:
        return {
          ...state,
          isLoading: true,
          earingResponse: {},
        };
  
      case EARNING_SUCCESS:
        return {
          ...state,
          isLoading: false,
          earingResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case EARNING_FAILURE:
        return {
          ...state,
          isLoading: false,
          earingResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default earning;
  