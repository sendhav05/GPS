
/* eslint no-underscore-dangle: 0 */

import {
  DRIVER_LOCATION_REQUEST,
  DRIVER_LOCATION_SUCCESS,
  DRIVER_LOCATION_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  driverLocationResponse: {},
};

function driverLocation(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case DRIVER_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        driverLocationResponse: {},
      };

    case DRIVER_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driverLocationResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case DRIVER_LOCATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        driverLocationResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default driverLocation;
