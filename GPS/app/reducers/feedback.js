/* eslint no-underscore-dangle: 0 */

import {
    FEEDBACK_REQUEST,
    FEEDBACK_SUCCESS,
    FEEDBACK_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    feedbackResponse: {},
  };
  
  function feedback(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case FEEDBACK_REQUEST:
        return {
          ...state,
          isLoading: true,
          feedbackResponse: {},
        };
  
      case FEEDBACK_SUCCESS:
        return {
          ...state,
          isLoading: false,
          feedbackResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case FEEDBACK_FAILURE:
        return {
          ...state,
          isLoading: false,
          feedbackResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default feedback;
  
  