/* eslint no-underscore-dangle: 0 */

import {
    NOTIFICATION_LIST_REQUEST,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    notificationListResponse: {},
  };
  
  function notification(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case NOTIFICATION_LIST_REQUEST:
        return {
          ...state,
          isLoading: true,
          notificationListResponse: {},
        };
  
      case NOTIFICATION_LIST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          notificationListResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case NOTIFICATION_LIST_FAILURE:
        return {
          ...state,
          isLoading: false,
          notificationListResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default notification;
  
  