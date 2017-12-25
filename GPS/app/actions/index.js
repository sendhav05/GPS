import { bindActionCreators } from 'redux';
import { store } from '../store';

import { userLoginRequest,
  userSignupRequest,
  resetUserSignupData,
  fetchWareHouseRequest }
  from './Authentication';

const actions = {
  userLoginRequest,
  userSignupRequest,
  resetUserSignupData,
  fetchWareHouseRequest,
};

export default bindActionCreators(actions, store.dispatch);
