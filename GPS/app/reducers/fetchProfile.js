
/* eslint no-underscore-dangle: 0 */

import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
  } from '../actions/Authentication';
  
  const initialState = {
    isLoading: false,
    fetchProfileResponse: {},
  };
  
  function fetchProfile(state = initialState, action) {
    if (action.type === 'undefined') {
      return state;
    }
  
    switch (action.type) {
      case FETCH_PROFILE_REQUEST:
        return {
          ...state,
          isLoading: true,
          fetchProfileResponse: {},
        };
  
      case FETCH_PROFILE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          fetchProfileResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      case FETCH_PROFILE_FAILURE:
        return {
          ...state,
          isLoading: false,
          fetchProfileResponse: {
            response: JSON.parse(action.data._bodyInit),
            status: action.data.status,
          },
        };
  
      default:
        return state;
    }
  }
  
  export default fetchProfile;
  
  