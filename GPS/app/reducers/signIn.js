
import {
  SIGNIN_ACTION,
} from '../actions/user';

const initialState = {
  isLoading: false,
};

function signIn(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_ACTION:
    console.log('sign in screen reducers');
   
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

export default signIn;
