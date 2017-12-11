import { bindActionCreators } from 'redux';
import { store } from '../store';

import { signInUser } from './user';
import { userLoginRequest } from './Authentication';

const actions = {
  signInUser,
  userLoginRequest,
};

export default bindActionCreators(actions, store.dispatch);
