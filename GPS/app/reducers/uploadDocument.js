/* eslint no-underscore-dangle: 0 */

import {
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILURE,
} from '../actions/Authentication';

const initialState = {
  isLoading: false,
  uploadDocumentResponse: {},
};

function uploadDocument(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case UPLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        uploadDocumentResponse: {},
      };

    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        uploadDocumentResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    case UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        uploadDocumentResponse: {
          response: JSON.parse(action.data._bodyInit),
          status: action.data.status,
        },
      };

    default:
      return state;
  }
}

export default uploadDocument;

