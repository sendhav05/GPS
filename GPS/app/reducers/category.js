/* eslint no-underscore-dangle: 0 */

import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  categoryListResponse: {},
};

function categoryList(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        categoryListResponse: {},
      };

    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case CATEGORY_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        categoryListResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default categoryList;
