
/* eslint no-underscore-dangle: 0 */

import {
    HELP_REQUEST,
    HELP_SUCCESS,
    HELP_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    helpResponse: {},
  };
  
  function help(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case HELP_REQUEST:
        return {
          ...state,
          isLoading: true,
          helpResponse: {},
        };
  
      case HELP_SUCCESS:
        return {
          ...state,
          isLoading: false,
          helpResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case HELP_FAILURE:
        return {
          ...state,
          isLoading: false,
          helpResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default help;
  