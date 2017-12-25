/* eslint no-underscore-dangle: 0 */

import {
  WARE_HOUSE_REQUEST,
  WARE_HOUSE_SUCCESS,
  WARE_HOUSE_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  wareHouseResponse: {},
};

function wareHouse(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case WARE_HOUSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        wareHouseResponse: {},
      };

    case WARE_HOUSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        wareHouseResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case WARE_HOUSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        wareHouseResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default wareHouse;
