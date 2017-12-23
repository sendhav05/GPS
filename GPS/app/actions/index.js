import { bindActionCreators } from 'redux';
import { store } from '../store';

import { signInUser } from './user';
import { userLoginRequest,
  userSignupRequest,
  resetUserSignupData }
  from './Authentication';

const actions = {
  signInUser,
  userLoginRequest,
  userSignupRequest,
  resetUserSignupData,
};

export default bindActionCreators(actions, store.dispatch);
