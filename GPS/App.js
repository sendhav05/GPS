import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import runRootSaga from './app/sagas';
import Navigator from './app/navigator';

import SignIn from './app/screens/Welcome/index';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    runRootSaga();
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
