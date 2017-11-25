import { bindActionCreators } from 'redux';
import {
  signInUser,
} from './user';
import { store } from '../store';

const actions = {
  signInUser,
};

export default bindActionCreators(actions, store.dispatch);
