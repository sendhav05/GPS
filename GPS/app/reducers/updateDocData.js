/* eslint no-underscore-dangle: 0 */

import {
    UPDATE_DOCUMENT_NUM_REQUEST,
    UPDATE_DOCUMENT_NUM_SUCCESS,
    UPDATE_DOCUMENT_NUM_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    updateDocDataResponse: {},
  };
  
  function updateDocData(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case UPDATE_DOCUMENT_NUM_REQUEST:
        return {
          ...state,
          isLoading: true,
          updateDocDataResponse: {},
        };
  
      case UPDATE_DOCUMENT_NUM_SUCCESS:
        return {
          ...state,
          isLoading: false,
          updateDocDataResponse: {
            response: action.data._bodyInit ? JSON.parse(action.data._bodyInit) : '',
            status: action.data.status,
          },
        };
  
      case UPDATE_DOCUMENT_NUM_FAILURE:
        return {
          ...state,
          isLoading: false,
          updateDocDataResponse: {
            response: action.data._bodyInit ? JSON.parse(action.data._bodyInit) : '',
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default updateDocData;
  