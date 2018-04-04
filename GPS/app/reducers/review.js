
/* eslint no-underscore-dangle: 0 */

import {
    REVIEW_REQUEST,
    REVIEW_SUCCESS,
    REVIEW_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    reviewResponse: {},
  };
  
  function review(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case REVIEW_REQUEST:
        return {
          ...state,
          isLoading: true,
          reviewResponse: {},
        };
  
      case REVIEW_SUCCESS:
        return {
          ...state,
          isLoading: false,
          reviewResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case REVIEW_FAILURE:
        return {
          ...state,
          isLoading: false,
          reviewResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default review;
  