import { call, put, takeEvery } from 'redux-saga/effects';
import {
  apiCall,
} from '../apiInterface';
import { API_ACTION } from '../actions/apiActions';

function* manageResponseData(action, response) {
  if (response.error || (response.status &&
  (response.status < 200 || response.status >= 300))) {
    yield put({ type: action.types[2], data: response, ...action.options });
  } else {
    yield put({ type: action.types[1], data: response, ...action.options });
  }
}

function* apiInterface(action) {
  try {
    yield put({ type: action.types[0] });
    const response = yield call(apiCall, action.url, action.method,
      action.body, action.header, action.headers);
    yield call(manageResponseData, action, response);
  } catch (e) {
    yield put({ type: action.types[2], data: e });
  }
}

export default function* watchApi() {
  yield takeEvery(API_ACTION, apiInterface);
}
