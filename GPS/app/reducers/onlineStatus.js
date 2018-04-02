/* eslint no-underscore-dangle: 0 */

import {
    ONLLINE_STATUS_REQUEST,
    ONLLINE_STATUS_SUCCESS,
    ONLLINE_STATUS_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    onlineStatusResponse: {},
  };
  
  function onlineStatus(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case ONLLINE_STATUS_REQUEST:
        return {
          ...state,
          isLoading: true,
          onlineStatusResponse: {},
        };
  
      case ONLLINE_STATUS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          onlineStatusResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case ONLLINE_STATUS_FAILURE:
        return {
          ...state,
          isLoading: false,
          onlineStatusResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default onlineStatus;
  
  