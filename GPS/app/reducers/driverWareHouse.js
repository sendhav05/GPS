/* eslint no-underscore-dangle: 0 */

import {
  DRIVER_WARE_HOUSE_REQUEST,
  DRIVER_WARE_HOUSE_SUCCESS,
  DRIVER_WARE_HOUSE_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  driverWareHouseResponse: {},
};

function driverWareHouse(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case DRIVER_WARE_HOUSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        driverWareHouseResponse: {},
      };

    case DRIVER_WARE_HOUSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driverWareHouseResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case DRIVER_WARE_HOUSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        driverWareHouseResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default driverWareHouse;

